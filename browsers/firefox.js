var puppeteer = require('puppeteer');

/*module.exports = {
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
}*/
var puppeteer = require('puppeteer');

module.exports = {
    initialize : function(options, cb){
        //return puppeteer instance
        puppeteer.launch({
            headless: !options.debug,
            product: 'firefox'
        }).then(function(instance){
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
    runTests : function(page, tests, testList, cb){
        //todo: inject deps
        var errs = [];
        var done;
        page.on('console', function(message){
            try{
                if(message.type().substr(0, 3) === 'log'){
                    var text = `${message.text()}`;
                    if(text[0] === '['){ //maybe a
                        var data = JSON.parse(text);
                        if(typeof data[0] === 'string'){
                            if(data[0] === 'pass'){
                                done = true;
                                cb(null, data[1]);
                            }
                            if(data[0] === 'fail'){
                                var error = new Error('Test Fail');
                                error.testName = data[0].title;
                                error.duration = data[0].duration;
                                cb(error);
                            }
                        }
                    }
                }
            }catch(ex){
                errs.push(ex);
            }
        });
        var testHTML = tests.as('html');
        page.setContent(`<html>
                <head>
                    <title>perr-pressure test</title>
                </head>
                <body>
                    ${testHTML}
                </body>
            </html>`
        ).then(function(){
        }).catch(function(ex){
            errs.push(ex);
            if(!done) cb(errs[0]);
            else console.log(errs);
        })
    }
}
