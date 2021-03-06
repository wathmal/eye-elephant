/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import http from 'http';
import socketIO from 'socket.io';
import RethinkDBService from './services/RethinkDBService';
import bodyParser from 'body-parser';

const server = global.server = express();

const httpServer = http.createServer(server);

//server.set('port', (process.env.PORT || 5000));
const port = 3006;
server.set('port', port);

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(express.static(path.join(__dirname, 'public')));

var io = socketIO(httpServer);

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content'));

// Get leaderboard
server.get('/leaderboard/all', (req, res, err) => {
  console.log(req.body);
  RethinkDBService.getLeaderboard().then(response => {
    res.send(response);
  }, error => {
    console.log('server ' + error);
    res.sendStatus(error);
  });
});

// Sign in api
server.post('/leaderboard/add', (req, res, err) => {
  console.log(req.body);
  RethinkDBService.addToLeaderboard(req.body.username, req.body.points, req.body.x, req.body.y).then(response => {
    res.send(response);
  }, error => {
    console.log('server ' + error);
    res.sendStatus(error);
  });
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------

server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
  } catch (err) {
    next(err);
  }
});

RethinkDBService.liveUpdates(io);

//
// Launch the server
// -----------------------------------------------------------------------------

httpServer.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});
