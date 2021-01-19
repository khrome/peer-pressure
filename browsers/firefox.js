var puppeteer = require('puppeteer');

module.exports = {
    initialize : function(options, cb){
        //return puppeteer instance
        puppeteer.launch({product:'firefox'}).then(function(instance){
            cb(null, instance);
        }).catch(function(ex){
            cb(ex);
        })
    },
    name: 'firefox',
    newContext : function(instance, cb){
        instance.newPage().then(function(page){
            cb(null, page);
        }).catch(function(ex){
            cb(ex);
        })
    },
    runTests : function(page, tests, cb){
        console.log('FF RUN TESTS!');
    }
}
