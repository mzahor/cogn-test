var angular = require('angular');
require('angular-datepicker/angular-datepicker.js');
require('angular-datepicker/angular-datepicker.css');

var registrationModule = angular.module('app.registration', [
    require('angular-messages'),
    'datePicker'
]);

require('./registrationDirective')(registrationModule);
require('./registrationService')(registrationModule);

module.exports = registrationModule;