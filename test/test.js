var should = require('chai').should();
var peers = require('../context').with({
    browsers : [
        require('../browsers/chrome'),
        //require('../browsers/firefox')
    ],
    framework : require('../frameworks/mocha'),
    packager : require('../packagers/webpack'),
    //debug:true
});
var waitSeconds = 10;

describe('karma-context', function(){
    describe('simple', function(){
        describe('single browser tests', function(){
            this.timeout(waitSeconds * 1000);
            peers.can('start & stop without errors', function(done){
                console.log('REMOTE LOG A');
                done();
            }, function(done){
                console.log('REMOTE LOG B');
                done();
            });

            after(function(done){
                peers.cleanup(function(err){ done() })
            })
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
