'use strict';

require.config({
	'baseUrl': '/js',
	'paths': {
		'angular': '/../bower_components/angular/angular',
		'angular-route': '/../bower_components/angular-route/angular-route',
		'jquery': '/../bower_components/jquery/dist/jquery',
		'bootstrap': '/../bower_components/bootstrap/dist/js/bootstrap',
		'array-util': '/../bower_components/array-util/lib/util'
	},
	'shim': {
		'angular': {
			'exports': 'angular'
		},
		'angular-route': {
			'deps': ['angular']
		},
		'bootstrap': {
			'deps': ['jquery']
		}
	}
});

define(['angular', 'app'], function(angular) {
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['qz']);
	});
});
