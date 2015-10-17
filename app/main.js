'use strict';
require('angular');
//TODO: iiterate modules automatically
var app = angular.module('testApp', [
    require('./modules/test'),
    require('./modules/user')
  ]
);
