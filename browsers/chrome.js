var puppeteer = require('puppeteer');

module.exports = {
    initialize : function(options, cb){
        //return puppeteer instance
        puppeteer.launch({headless:!options.debug}).then(function(instance){
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
    runTests : function(page, tests, cb){
        console.log('CH RUN TESTS!', tests);
        console.log('SET');
        page.setContent(`<html>
                <head>
                    <script>
                        console.log('something')
                    </script>
                </head>
                <body><b>OMG</b></body>
            </html>`
        ).then(function(){
            //maybe wait for a bit?

        }).catch(function(ex){
            errs.push(ex);
        })
    }
}
