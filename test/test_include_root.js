module.exports = {
    fnKey :  function(cb){
         setTimeout(function(){
             cb();
        }, 0);
    }
}
