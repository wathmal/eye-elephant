/**
 * Created by thisara on 3/1/16.
 */
import _ from 'underscore';
var AppConstants = require('../constants/AppConstants');

export function getCookie() {
  return localStorage.getItem("cookie");
}

export function setCookie(name, value)
{
  if(typeof(Storage) !== "undefined") {
    localStorage.setItem("cookie", name+"=" + value);
  } else {
    alert('Please update your browser to html5.');
  }
}

export function removeCookie() {
  return localStorage.removeItem("cookie");
}

export function getUser()
{
  return localStorage.getItem("user");
}

export function setUser(user)
{
  if(typeof(Storage) !== "undefined") {
    localStorage.setItem("user", user);
  } else {
    alert('Please update your browser to html5.');
  }
}

export function removeUser() {
  return localStorage.removeItem("user");
}

export function formatLeaderboard(data) {

  data = _.sortBy(data, function(player) {
    return parseInt(player.points)
  }).reverse();

  var players = [];
  for (var i = 0; i < data.length; i++) {
    var element = data[i];
    element.rank = i + 1;
    players.push(element);
  }
  return players;
}
