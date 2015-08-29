"use strict";
require("babelify/polyfill");
module.exports = function($scope, $interval) {
  $scope.test= 0;
  $interval(() => {
    $scope.test += 1;
  }, 1000);
};
