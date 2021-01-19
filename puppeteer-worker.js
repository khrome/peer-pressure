var asynk = require('async');
// PuppeteerFloor : handles all work, takes sets of things to be done
// PuppeteerWorker : does a task in a single context type
// PuppeteerJob : a collection of tasks that forms some work to be done
// PuppeteerTask : does a task in a single context type

var PuppeteerFloor = function(options){
    if(!options.browsers) throw new Error('you must provide browsers to use');
    if(!options.framework) throw new Error('you must provide a framework to use');
    //if(!options.loader) throw new Error('you must provide a loader to use');
    if(!options.packager) throw new Error('you must provide a packager to use');
}

PuppeteerFloor.prototype.prepareJob = function(work){
    //open a tab, inject the code, monitor results
    var job = (work instanceof PuppeteerJob)?work:new PuppeteerJob(work);

}

var PuppeteerWorker = function(options){


}

PuppeteerWorker.prototype.do = function(job, cb){
    var work;
    if(Array.isArray(job)){
        work = new PuppeteerJob();
        job.forEach(function(task){ work.add(task) });
    }else work = job;
    work.do(cb);
}

var PuppeteerJob = function(){
    var args = Array.prototype.slice.call(arguments);
    this.tasks = [];
}
PuppeteerJob.prototype.add = function(task){
    this.tasks.push(task)
}
PuppeteerJob.prototype.do = function(cb){

    this.tasks.forEach(function(){

    })
}

var PuppeteerTask = function(work){
    this.work = work;
}

PuppeteerTask.prototype.do = function(task){

}

module.exports = {
    Worker : PuppeteerWorker,
    Job : PuppeteerJob,
    Floor : PuppeteerFloor,
    Task : PuppeteerTask
};
