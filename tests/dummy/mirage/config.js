/*global Uint8Array*/
import Mirage from 'ember-cli-mirage';

var genId = function() {
  var arr = new Uint8Array(8);
  window.crypto.getRandomValues(arr);
  return [].map.call(arr, function(n) { return n.toString(16); }).join("");
};

export default function() {
  this.get('/users');
  this.get('/users/:id');
  this.post('/users');
  this.put('/users/:id');
  this.put('/update_users');
  this.del('/users/:id', 'user');

  this.get('/companies');

  this.get('/cars');

  this.get('/offices_for_company');
  this.get('/offices_for_company/:id');

  this.get('/cities');
  this.get('/cities/:id');

  this.pretender.get('/*passthrough', this.pretender.passthrough);
}
