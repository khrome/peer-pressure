var webpack = require('webpack');
var path = require( 'path' );
var fs = require( 'fs' );
var tmp = require('tmp');
var wpconfig;
try{
    var p = path.resolve('.webpack.config.js' );
    wpconfig = require(p);
    console.log('>>', p, wpconfig);
}catch(ex){
    console.log(ex);
}
module.exports = {
    compileSource : function(dependencies, cb){
        var imports = Object.keys(dependencies).map(function(key){
            return "window._imports['"+key+"'] = require('"+path.resolve(process.cwd(), dependencies[key])+"')";
        });
        imports.unshift('window._imports = {}');

        tmp.file(function(err, path, fd, cleanupCallback){
          if(err) throw err;
          var imp = imports.join(";\n");
          fs.writeFile(path, imp, function(err){
              if(err) throw err;
              var config = wpconfig({}, {mode:'development'});
              config.entry = path;
              console.log('WPACK', imp);
              console.log('WPACKO', config);
              webpack(config, function(err, stats){
                  if(err || stats.hasErrors()){
                      // [Handle errors here](#error-handling)
                  }
                  console.log('File: ', err, stats);
                  cb();
                  console.log('File: ', path);
                  console.log('Filedescriptor: ', fd);
                  cleanupCallback();
              });
          });
        });
    }
}
