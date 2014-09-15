'use strict';

define(['angular', 'qz.quiz/QuizCtrl'], function(angular, QuizCtrl) {

	angular
		.module('qz.quiz', [])
		.config(['$routeProvider',
			function($routeProvider) {
				$routeProvider.when('/quiz/:file', {
					'templateUrl': '/partials/quiz.html',
					'controller': QuizCtrl,
					'controllerAs': 'quiz',
					'resolve': QuizCtrl.resolve
				});
			}
		])
		.controller('QuizCtrl', QuizCtrl);
});
