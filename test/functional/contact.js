// force the test environment to 'test'
process.env.NODE_ENV = 'test';
// use zombie.js as headless browser
var Browser = require('zombie');
var http    = require('http');

// get the application server module
var app = require('../../server');

describe('contact page', function() {

  before(function() {
    this.server = http.createServer(app).listen(3000);
    // initialize the browser using the same port as the test application
    this.browser = new Browser({ site: 'http://localhost:3000' });
  });

  // load the contact page
  before(function(done) {
    this.browser.visit('/contact', done);
  });

  it('should show contact a form');
  it('should refuse empty submissions');
  it('should refuse partial submissions');
  it('should keep values on partial submissions');
  it('should refuse invalid emails');
  it('should accept complete submissions');

  after(function(done) {
    this.server.close(done);
  });
});