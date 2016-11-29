/*global Uint8Array*/
import Mirage from 'ember-cli-mirage';

var genId = function() {
  var arr = new Uint8Array(8);
  window.crypto.getRandomValues(arr);
  return [].map.call(arr, function(n) { return n.toString(16); }).join("");
};

export default function() {
  this.get('/users', function(db, req){
    return {dummy_users: db.users};
  });
  this.get('/users/:id', function(db, req){
    let user = db.users.find(req.params.id);
    return {dummy_user: user};
  });
  this.post('/users', function(db, request) {
    var attrs = JSON.parse(request.requestBody)['user'];
    attrs._id = genId();
    delete attrs.id;
    // return new Mirage.Response(404, null, null); // Need this for testing
    return {dummy_user: attrs};
  });
  this.put('/users/:id', function(db, request) {
    var attrs = JSON.parse(request.requestBody)['user'];
    // return new Mirage.Response(408, null, null); // Need this for testing
    return {dummy_user: attrs};
  });
  this.put('/update_users', function(db, request) {
    // var attrs = JSON.parse(request.requestBody)['user'];
    return new Mirage.Response(408, null, null); // Need this for testing
    // return {dummy_user: attrs};
  });
  this.del('/users/:id', 'user');

  this.get('/companies', function(db, req){

    if (req.queryParams.firstTwo) {
      return {companies: db.companies.slice(0,2)};
    }
    return {companies: db.companies}; 
  });

  this.get('/cars', function(db, req){
    return {cars: db.cars}; 
  });

  this.get('/offices_for_company', function(db, req){
    return {offices: db.offices};
  });
  this.get('/offices_for_company/:id', function(db, req){
    let office = db.offices.find(req.params.id);
    return {offices: office};
  });

  this.get('/cities', function(db, req){
    return {cities: db.cities};
  });
  this.get('/cities/:id', function(db, req){
    let city = db.cities.find(req.params.id);
    return {city: city};
  });

  this.pretender.get('/*passthrough', this.pretender.passthrough);
}
