module.exports = {
    initialize : function(options, cb){
        //return puppeteer instance
    },
    name: 'server',
    newContext : function(instance, cb){

    },
    runTests : function(page, tests, testList, cb){
        //todo: inject deps
        var errs = [];
        var done;
        try{
            var testHTML = tests.as('fn');
            var root = page.window.document.getElementsByTagName('html');
            root.innerHTML = `<html>
                <head>
                    <title>perr-pressure test</title>
                </head>
                <body>
                    ${testHTML}
                </body>
            </html>`;
        }catch(ex){
            errs.push(ex);
            if(!done) cb(errs[0]);
            else console.log(errs);
        }
    }
}
