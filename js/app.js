'use strict';

define([
	'angular',
	'angular-route',
	'bootstrap',
	'array-util',
	'qz.menu/MenuModule',
	'qz.quiz/QuizModule'
], function(angular) {

	angular
		.module('qz', [
			'ngRoute',
			'qz.menu',
			'qz.quiz'
		])
		.factory('httpRequestInterceptor', function($q, $location) {
			return {
				'responseError': function(rejection) {
					$location.path('/404/');
					return $q.reject(rejection);
				}
			};
		})
		.config(['$routeProvider', '$locationProvider', '$httpProvider',
			function($routeProvider, $locationProvider, $httpProvider) {
				$httpProvider.interceptors.push('httpRequestInterceptor');

				$locationProvider.html5Mode(true);

				$routeProvider.when('/', {'templateUrl': '/partials/start.html'});
				$routeProvider.when('/about', {'templateUrl': '/partials/about.html'});
				$routeProvider.when('/404', {'templateUrl': '/partials/404.html'});

				$routeProvider.otherwise({'redirectTo': '/404'});
			}
		])
		;

});

