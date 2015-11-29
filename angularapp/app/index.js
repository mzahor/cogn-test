require('bootstrap-webpack');
require('expose?$!expose?jQuery!jquery');

var angular = require('angular');

if (ON_TEST) {
    require('angular-mocks/angular-mocks');
}

var appModule = angular.module('app', [
    require('./states/registration').name
]);
