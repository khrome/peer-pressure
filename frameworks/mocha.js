var fnToMochaTestBody = function(desc, fn){
    var body = fn.toString();
    var fileBody = `describe('test', function(){
        it('${desc}', ${body})
    })`;
    return new Function(fileBody);
};
var fnsToMochaTestBody = function(desc, fns, wrapInContext){
    var body = '';
    if(wrapInContext){
        body += "describe('test', function(){"+"\n";
    }
    fns.forEach(function(fn, index){
        var name = fns.length === 1?desc:desc + '-'+(fn.name || index);
        var fnBody = fn.toString();
        body += `    it('${name}', ${fnBody})`+"\n";
    });
    if(wrapInContext){
        body += '});';
    }
    return body;
};
var fnsToMochaTest = function(desc, fns, wrapInContext){
    if(wrapInContext){
        describe('peers-can', function(){
            fns.forEach(function(fn, index){
                var name = fns.length === 1?desc:desc + '-'+(fn.name || index);
                it(name, fn);
            });
        });
    }else{
        fns.forEach(function(fn, index){
            var name = fns.length === 1?desc:desc + '-'+(fn.name || index);
            it(name, fn);
        });
    }
};
var control = {
    testBody : function(description, testLogicFn){
        return fnsToMochaTestBody(description, [testLogicFn]);
    },
    testHTML : function(description, testLogicFn, dependenciesBundle){
        var test = control.testBody(description, testLogicFn);
        var html = `
        <div id="mocha"></div>
        <script src="https://cdn.rawgit.com/mochajs/mocha/2.2.5/mocha.js"></script>
        <script src="https://cdn.rawgit.com/chaijs/chai/4.2.0/chai.js"></script>
        <script>
            ${dependenciesBundle}
        </script>
        <script>mocha.setup({ui:'bdd', reporter: 'json-stream'})</script>
        <script>
            ${test}
        </script>
        <script>
            mocha.checkLeaks();
            mocha.globals([]);
            mocha.run();
        </script>`
        return html;
    },
    test : function(description, testLogicFn, clean){
        var fn;
        if(clean){
            //context free (safe for isolated execution)
            var body = control.testBody(description, testLogicFn);
            fn = new Function(body);
            fn();
        }else{
            fnsToMochaTest(description, [testLogicFn]);
        }
    }
}

module.exports = control;
