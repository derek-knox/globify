var path = require('path');
var transformTools = require('browserify-transform-tools');
var Glob = require("glob").Glob

var transform = transformTools.makeRequireTransform(
    "requireTransform",
    {evaluateArguments: true},
    function(args, opts, cb) {
      if (!args[0].match(/\*/)) return cb();
      requireGlob = args[0];
      sourceFile = opts.file;
      dirName = path.dirname(sourceFile);
      options = {
        root: dirName,
        cwd: dirName,
        //globDebug: true,
        sync: true
      }
      myGlob = new Glob(requireGlob, options);

      files = Object.keys(myGlob.matches[0]);

      var requireArgs = [],
          selfFile = myGlob.found[0];
      files.forEach(function(file) {
        if(file === selfFile) { return; }
        requireArgs.push("require('" + file + "')");
      });

      cb(null, requireArgs.join(";\n"));
    }
);

module.exports = transform;
