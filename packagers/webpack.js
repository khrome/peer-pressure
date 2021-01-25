var webpack = require('webpack');
var path = require( 'path' );
var config;
try{
    config = require(path.resolve( process.cwd(), '.webpack.config.js' ))
}catch(ex){
    console.log(ex);
}
module.exports = {
    compileSource : function(sourceFiles, cb){
        console.log('WPACK')
        webpack(config, function(err, stats){
            if(err || stats.hasErrors()){
                // [Handle errors here](#error-handling)
            }
            cb();
        });
    }
}
