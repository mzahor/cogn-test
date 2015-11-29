var path = require('path');
require('karma-webpack');
var webpackConfig = require('./webpack.config');
var entry = path.resolve(webpackConfig.context, webpackConfig.entry);

var preprocessors = {};
preprocessors[entry] = ['webpack'];

module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['mocha', 'chai-jquery', 'chai', 'jquery-2.1.0'],

        files: [entry, 'app/**/*Spec.js'],

        webpack: webpackConfig,

        exclude: [],

        preprocessors: preprocessors,

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity,

        plugins: [
            'karma-webpack',
            'karma-jquery',
            'karma-chai',            
            'karma-chai-jquery',
            'karma-mocha',
            'karma-chrome-launcher'
        ]
    })
}
