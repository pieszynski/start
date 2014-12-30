
(function(window, $, angular) {
    'use strict';

    var app = angular.module('indexModule', ['ngSanitize', 'ngTouch']);

    app.directive('inAsText', function () {

        return function (scope, elem, attrs) {

            elem.text(scope.$eval(attrs.inAsText));
        };
    });

    app.controller('indexCtrl', ['$scope', function($scope) {

        var self = this;

        self.mulTwo = function (a, b) {

            return a * b;
        };
    }]);
})(window, jQuery, angular);
