var assert = require('assert');
var swagger = require("../index");
var fs = require("fs-extra-promise");
var path = require("path");
var Vinyl = require("vinyl");

describe('gulp-swagger-js-codegen', function() {
  describe('Read', function() {
    it('Read JSON Buffer', function(done) {
      fs.readFileAsync(path.join(__dirname, "example.json")).then(function (data) {
        var fakeFile = new Vinyl({
          contents: new Buffer(data)
        });
        var mySwagger = swagger();
        mySwagger.write(fakeFile);
        mySwagger.once("data", function (file) {
          assert(file.isBuffer());
          done();
        });
      }).catch(done);
    });
    it('Read YAML Buffer', function(done) {
      fs.readFileAsync(path.join(__dirname, "example.yaml")).then(function (data) {
        var fakeFile = new Vinyl({
          contents: new Buffer(data)
        });
        var mySwagger = swagger();
        mySwagger.write(fakeFile);
        mySwagger.once("data", function (file) {
          assert(file.isBuffer());
          done();
        });
      }).catch(done);
    });
    it('Fails on plain text Buffer', function(done) {
      fs.readFileAsync(path.join(__dirname, "failure.txt")).then(function (data) {
        var fakeFile = new Vinyl({
          contents: new Buffer(data)
        });
        var mySwagger = swagger();
        mySwagger.once("error", function () {
          done();
        });
        mySwagger.write(fakeFile);
      }).catch(done);
    });
  });
});