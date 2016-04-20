/**
 * Created by thisara on 4/19/16.
 */
import r from 'rethinkdb';
var AppConstants = require('../constants/AppConstants');
import { formatLeaderboard } from './../core/CommonUtils';

class RethinkDBService {
    constructor() {

    }

    connect() {
        return r.connect({
            host: AppConstants.RETHINKDB_HOST,
            port: AppConstants.RETHINKDB_PORT,
            db: AppConstants.RETHINKDB_DB
        });
    }

    liveUpdates(io) {
        console.log('Setting up listener...');
        this.connect()
            .then(conn => {
                r
                    .table('coordinate')
                    .get(1)
                    .changes().run(conn, function(err, cursor) {
                    console.log('Listening for changes...');
                    cursor.each((err, change) => {
                        console.log('Change detected', change);
                        io.emit('coordinate-change', change);
                    });
                });
            });
    }

    getLeaderboard() {
        return new Promise((fulfill, reject) => {
            this.connect()
                .then(conn => {
                    r.table('leaderboard').limit(10).run(conn, function(err, cursor) {
                        if (err) {
                            reject(err);
                        }
                        cursor.toArray(function(err, result) {
                            if (err) {
                                reject(err);
                            } else {
                                console.log(JSON.stringify(result, null, 2));
                                fulfill(formatLeaderboard(result));
                            }
                        });
                    });
                });
        });
    }

    addToLeaderboard(name, points, x, y) {
        return new Promise((fulfill, reject) => {
            this.connect()
                .then(conn => {
                    r.table('leaderboard').insert(
                        {
                            name: name, points: points, x:x, y:y
                        })
                        .run(conn, function(err, result) {
                            if (err) {
                                reject(err);
                            }
                            console.log(JSON.stringify(result, null, 2));
                            fulfill(result);
                        })
                });
        });
    }
}

export default new RethinkDBService();
