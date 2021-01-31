peer-pressure [prerelease 2]
=============

Simple P2P integration testing.

`peer-pressure` is a simple extension to your current testing frameworks to add browser testing in the background, through the existing interfaces, rather than building another "runner" solution. in this way we can get parallel subtests executing as tests in the respective browser, but all assemble to a single test target in the test suite.

This originally grew out of another project where I attempted to use existing testing projects only to find some basic assumptions had been made, not the least of which is plugins and servers do not run concurrently.

Because I'm testing browser based p2p stuff the only way I could get the behaviors I needed was to start fresh.

This is very early code, please file bugs! :D


Installation
------------

`npm install --save-dev peer-pressure`


Import
------

**ES5**

```javascript
    var peers = require('peer-pressure').with(<configuration>);
```

**ES6**

```javascript
    import * as peerPressure from 'peer-pressure';
    var peers = peerPressure.with(<configuration>);
```

Plugins
-------
Peer Pressure Plugins are denoted by: `ppp-<name>-<type>`. It's easy to publish your own.

[browsers](https://www.npmjs.com/search?q=ppp-*-browser&ranking=quality)
[frameworks](https://www.npmjs.com/search?q=ppp-*-framework&ranking=quality)
[packagers](https://www.npmjs.com/search?q=ppp-*-packager&ranking=quality)

Configuration
-------------

Example: **Use Mocha + Webpack and test in Chrome + FireFox**
(note these will eventually be independent modules)

```javascript
{
    browsers : [
        require('ppp-chrome-browser'),
        require('ppp-firefox-browser')
    ],
    dependencies : { //get shipped to the remote browser (with subdependencies)
        'module-name': 'local_module_name_or_location'
    },
    framework : require('ppp-mocha-framework'),
    packager : require('ppp-webpack-packager')
}
```


Case 1 : One Subtest Inside Test (One Browser, using mocha)
-------------------------------------------------------------

```javascript
    define('some standard mocha test context', function(){
        it('does something', function(testDone){
            peers.test(function(context, done){
                //this executes remotely in an isolated fresh browser context
                done();
            }, function(err, info){
                //this executes in *this* context
                testDone();
            });
        });
    });
```

Case 2 : One Subtest as a Test (One Browser, using mocha)
-------------------------------------------------------------------
```javascript
    define('some standard mocha test context', function(){
        peers.can('do something', function(context, done){
            //this executes remotely in an isolated fresh browser context
            done();
        });
    });
```

Case 3 : Three Subtests as a Test (Round robin browsers, using mocha)
-------------------------------------------------------------------
```javascript
    define('some standard mocha test context', function(){
        peers.can('do something', function(done){
            //this executes remotely in an isolated fresh browser context
            done();
        }, function(done){
            //this executes remotely in an isolated fresh browser context
            done();
        }, function(done){
            //this executes remotely in an isolated fresh browser context
            done();
        });
    });
```

Case 4 : Three Subtests as a Test (Specific browsers, using mocha)[TBD]
-------------------------------------------------------------------
```javascript
    define('some standard mocha test context', function(){
        peers.can('do something', function firefox(done){
            //this executes remotely in an isolated fresh browser context
            done();
        }, function chrome(done){
            //this executes remotely in an isolated fresh browser context
            done();
        }, function local(done){
            //this executes remotely in an isolated fresh browser context
            done();
        });
    });
```

Roadmap
-------
- packagers
    - browserify
    - UMD
    - parcel?
- browsers
    - server (no browser, isolated js)
    - local (jsdom implementation)
    - selenium/webdriver shim
    - safari?
- frameworks
    - jasmine
- loaders : convenience to load preset configurations
    - mocha + webpack + chrome(if no browser specified) + server
    - mocha + parcel + chrome(if no browser specified) + server
    - jasmine + webpack + chrome(if no browser specified) + server
    - jasmine + parcel + chrome(if no browser specified) + server
