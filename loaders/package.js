module.exports = {
    getConfig : function(cb){
        var pkg = require('./package.json');
        if(!pkg.peerPressure) return cb(new Error('No pper-pressure config found'));
        //todo: validate
        var config = pkg.peerPressure;
        config.browsers = config.browsers.map(function(browser){
            return require(browser);
        });
        config.framework = require(config.framework);
        config.packager = require(config.packager);
        cb(null, config);
    }
}
