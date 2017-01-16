var request = require("request");
var bind = require('bind');

var x=('./index.js');

var base_url = "http://localhost:1337/"

describe("impiegati Server", function() {
  describe("GET /", function() {
    

    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
      
    it("returns status code 406", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(406);
        done();
      });
    });
      
      
  });
});