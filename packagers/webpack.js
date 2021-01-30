var webpack = require('webpack');
var path = require( 'path' );
var fs = require( 'fs' );
var tmp = require('tmp');
//needs: babel-loader, css-loader, postcss-loader, file-loader
var wpconfig;
try{
    var p = path.resolve('.webpack.config.js' );
    wpconfig = require(p);
}catch(ex){
    console.log(ex);
}
module.exports = {
    compileSource : function(dependencies, cb){
        var imports = Object.keys(dependencies).map(function(key){
            return "window._imports['"+key+"'] = require('"+path.resolve(process.cwd(), dependencies[key])+"')";
        });
        imports.unshift('window._imports = {}');
        imports.unshift('window.require = function(m){ return window._imports[m] }');
        tmp.file(function(err, rootPath, fd, cleanupCallback){
          if(err) throw err;
          var imp = imports.join(";\n");
          fs.writeFile(rootPath, imp, function(err){
              if(err) throw err;
              var config = wpconfig({}, {mode:'development'});
              config.entry = rootPath;
              webpack(config, function(err, stats){
                  if(err || stats.hasErrors()){
                      console.log('Errors: ', err, stats);
                      return cb(err || stats.compilation.errors[0]);
                  }
                  var storedPath = path.resolve(config.output.path, config.output.filename);
                  fs.readFile(storedPath, function(err, body){
                      cleanupCallback();
                      cb(null, body.toString());
                  });
              });
          });
        });
    }
}
