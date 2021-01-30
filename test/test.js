var should = require('chai').should();
var path = require('path');
var peerPressure = require('../context');
var peers = peerPressure.with({
    browsers : [
        require('../browsers/chrome'),
        //require('../browsers/firefox')
    ],
    dependencies : { //todo: support relative path
        'test-module':path.resolve(__dirname, 'test_include_root.js')
    },
    framework : require('../frameworks/mocha'),
    packager : require('../packagers/webpack'),
    //debug:true
});
var waitSeconds = 10;

peerPressure.handleOrphanedPromises();

describe('karma-context', function(){
    describe('simple', function(){
        describe('single browser tests', function(){
            this.timeout(waitSeconds * 1000);
            peers.can('start & stop without errors', function(done){
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
                peers.cleanup(function(err){ console.log('CLEANdone'); done() })
            });
        });

        /*
        describe('dual browser tests', function(done){
            this.timeout(waitSeconds * 1000);
            context.will('start & stop without errors', function(done){
                console.log('REMOTE LOG A')
                done();
            }, function(done){
                console.log('REMOTE LOG B')
                done();
            }).finally(function(err, result, done){
                console.log('not done');
                done();
            });
        }); //*/
    });
});
