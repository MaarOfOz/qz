'use strict';

define(['angular'], function(angular) {
	function QuizCtrl($timeout, questions) {
		var self = this;

		self.questions = questions;

		self.state = '';

		self.i = 0;
		self.r = -1;
		self.w = -1;

		self.incorrectlyAnsweredQuestions = [];

		self.stats = {
			'right': 0,
			'wrong': 0
		};

		var start = function() {
			self.i = 0;
			self.stats.right = 0;
			self.stats.wrong = 0;
			self.incorrectlyAnsweredQuestions = [];
			shuffle_questions();
			shuffle_answers();
			self.state = 'checking';
		};
		var shuffle_questions = function() {
			self.questions.shuffle();
		};
		var shuffle_answers = function() {
			self.questions[self.i].p.shuffle();
		};

		start();

		self.start = start;

		self.answer = function(a) {
			if (self.r > -1) {
				return;
			}

			if (a === self.questions[self.i].a) {
				++self.stats.right;
				self.r = a;
			} else {
				++self.stats.wrong;
				self.r = self.questions[self.i].a;
				self.w = a;

				self.incorrectlyAnsweredQuestions.push({
					'question': self.questions[self.i],
					'answer': a
				});
			}

			$timeout(self.nextQuestion, 1500);
		};

		self.nextQuestion = function() {
			self.r = -1;
			self.w = -1;
			if (++self.i >= self.questions.length) {
				self.state = 'score';
				return;
			}
			shuffle_answers();
		};
	}

	QuizCtrl['$inject'] = ['$timeout', 'questions'];

	function QuizCtrlResolve($route, $http) {
		return $http.get('files/quizzes/' + $route.current.params.file).then(function(response) {
			return response.data;
		});
	}

	QuizCtrlResolve['$inject'] = ['$route', '$http'];

	QuizCtrl.resolve = {
		'questions': QuizCtrlResolve
	};


	return QuizCtrl;
});
