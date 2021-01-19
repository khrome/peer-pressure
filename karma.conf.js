module.exports = function (config) {
    config.set({
        browserConsoleLogOptions: {
            terminal: true,
            level: ""
        },
        frameworks: ['mocha', 'chai'],
        files: [],
        preprocessors: {
          '**/*.js': ['env']
        },
        envPreprocessor: [],
        reporters: [
            //'spec'
            'json-result'
        ],
        jsonResultReporter: {
          outputFile: "/tmp/output.json",
          isSynchronous: true
        },
        specReporter: {
          maxLogLines: 5,         // limit number of lines logged per test
          suppressErrorSummary: true,  // do not print error summary
          suppressFailed: false,  // do not print information about failed tests
          suppressPassed: false,  // do not print information about passed tests
          suppressSkipped: true,  // do not print information about skipped tests
          showSpecTiming: false // print the time elapsed for each spec
        },
        port: 9876,  // karma web server port
        colors: true,
        client: {
            captureConsole: false
        },
        logLevel: config.LOG_DISABLE,
        browsers: [
            //'ChromeHeadless',
            'Firefox',
            'Opera'
            //'IE'
            //, 'FirefoxDeveloper', 'FirefoxNightly',
            //'OperaClassic'
        ],
        autoWatch: false,
        concurrency: Infinity,
        customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: ['-headless'],
            },
        },
    })
}
