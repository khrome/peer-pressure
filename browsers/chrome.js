var puppeteer = require('puppeteer');

module.exports = {
    initialize : function(options, cb){
        //return puppeteer instance
        puppeteer.launch({
            headless:!options.debug
        }).then(function(instance){
            cb(null, instance);
        }).catch(function(ex){
            cb(ex);
        })
    },
    name: 'chrome',
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
        page.on('console', function(message){
            try{
                if(message.type().substr(0, 3) === 'log'){
                    var text = `${message.text()}`;
                    if(text[0] === '['){ //maybe a
                        var data = JSON.parse(text);
                        if(typeof data[0] === 'string'){
                            if(data[0] === 'pass'){
                                cb(null, data[1]);
                            }
                            if(data[0] === 'fail'){
                                var error = new Error('Test Fail');
                                error.testName = data[0].title;
                                error.duration = data[0].duration;
                            }
                        }
                    }
                }
            }catch(ex){
                errs.push(ex);
            }
        });
        page.setContent(`<html>
                <head>
                    <title>perr-pressure test</title>
                </head>
                <body>
                    ${tests}
                </body>
            </html>`
        ).then(function(){
        }).catch(function(ex){
            errs.push(ex);
            cb(errs[0]);
        })
    }
}
