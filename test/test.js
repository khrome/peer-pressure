var should = require('chai').should();
var path = require('path');
var peerPressure = require('../context');
var peers = peerPressure.with({
    browsers : [
        require('ppp-chrome-browser'),
        //require('ppp-firefox-browser')
    ],
    dependencies : { //todo: support relative path
        'test-module':path.resolve(__dirname, 'test_include_root.js')
    },
    framework : require('ppp-mocha-framework'),
    packager : require('ppp-webpack-packager'),
    //debug:true
});
var waitSeconds = 10;

peerPressure.handleOrphanedPromises();

describe('peer-pressure', function(){
    describe('simple', function(){
        describe('single browser tests', function(){
            this.timeout(waitSeconds * 1000);
            peers.can('start & stop without errors', function(done){
                done();
            });
        });


        describe('dual browser tests', function(done){
            this.timeout(waitSeconds * 1000);
            peers.can('start & stop without errors', function(done){
                console.log('LOG A');
                done();
            }, function(done){
                console.log('LOG B');
                done();
            });

            peers.can('use dependency fn with async return', function(done){
                var dep = require('test-module');
                dep.fnKey(function(){
                    console.log('LOG A2');
                    done();
                });
                console.log('LOG A');
            }, function(done){
                console.log('LOG B');
                done();
            });

            after(function(done){
                peers.cleanup(function(err){
                    done();
                });
            });
        });
    });
});
