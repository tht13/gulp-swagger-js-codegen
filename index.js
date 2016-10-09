var through = require('through2');
var CodeGen = require('swagger-js-codegen').CodeGen;
var safeLoad = require("js-yaml").safeLoad;
var PluginError = require('gulp-util').PluginError;
var defaults = require('object.defaults');

module.exports = function (options) {
  options = options || {};
  defaults(options, {
    type: "typescript",
    swaggerOptions: {}
  });
  return through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      // nothing to do
      return callback(null, file);
    }

    if (file.isStream()) {
      this.emit('error', new PluginError("gulp-swagger-js-codegen", 'Streams not supported!'));
      return callback(null, file);
    } else if (file.isBuffer()) {
      var contents = file.contents.toString("utf8");
      var json;

      try {
        json = JSON.parse(contents);
      } catch (e) {
        json = safeLoad(contents);
      }
      if (typeof json !== "object") {
        var err = new PluginError("gulp-swagger-js-codegen", 'Input must be valid JSON or YAML');
        this.emit('error', err);
        return callback(null, file);
      }

      options.swaggerOptions.swagger = json;
      var output;
      switch (options.type) {
        case "typescript":
          output = CodeGen.getTypescriptCode(options.swaggerOptions);
          break;
        case "node":
          output = CodeGen.getNodeCode(options.swaggerOptions);
          break;
        case "angular":
          output = CodeGen.getAngularCode(options.swaggerOptions);
          break;
      }

      var newFile = file.clone();
      newFile.contents = new Buffer(output);
      newFile.path = './definitions.d.ts';
      callback(null, newFile);
    }
  });
};
