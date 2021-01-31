//var puppeteer = require('puppeteer');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;

module.exports = {
    initialize : function(options, cb){
        //return puppeteer instance
    },
    name: 'local',
    newContext : function(instance, cb){
        var virtualConsole = new jsdom.VirtualConsole();
        try{
            var page = new JSDOM(`<html>
                <head>
                    <title>empty page</title>
                </head>
            </html>`, {virtualConsole: virtualConsole});
            page.console = virtualConsole;
            return page;
        }catch(ex){
            if(!done) cb(ex);
        }
    },
    runTests : function(page, tests, testList, cb){
        //todo: inject deps
        var errs = [];
        var done;
        page.console.on('log', function(message){
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
        try{
            var testHTML = tests.as('html');
            var root = page.window.document.getElementsByTagName('html');
            root.innerHTML = `<html>
                <head>
                    <title>perr-pressure test</title>
                </head>
                <body>
                    ${tests}
                </body>
            </html>`;
        }catch(ex){
            errs.push(ex);
            if(!done) cb(errs[0]);
            else console.log(errs);
        }
    }
}
