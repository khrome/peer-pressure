var webpack = require('webpack');
module.exports = {
    compileSource : function(sourceFiles, cb){
        webpack({
          // [Configuration Object](/configuration/)
          name: "dynamic-webpack-bundle",

        }, function(err, stats){
            if(err || stats.hasErrors()){
                // [Handle errors here](#error-handling)
            }
              // Done processing
        });
    }
}
