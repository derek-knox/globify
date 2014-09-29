var path = require('path');
var transformTools = require('browserify-transform-tools');
var glob = require("glob")

var firstDir = null;

var transform = transformTools.makeRequireTransform(
    "requireTransform",
    {evaluateArguments: true},
    function(args, opts, cb) {
      if (!args[0].test(/\*+\?/\?(*+)/)) return cb();
      files = []
      glob(args[0], {}, function (er, _files) {
        files = _files
      });

      files = files.map(function(f) {
        return path.resolve(_dirname, f);
      });



    }
);

module.exports = transform;
