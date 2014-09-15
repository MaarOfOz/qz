'use strict';

define(['angular'], function(angular) {
	function QuizCtrl($timeout, questions) {
		var self = this;

		self.i = 0;
		self.r = -1;
		self.w = -1;

		self.stats = {
			'right': 0,
			'wrong': 0
		};

		var shuffle_questions = function(questions) {
			self.questions = questions.shuffle();
		};
		var shuffle_answers = function() {
			self.questions[self.i].p.shuffle();
		};

		shuffle_questions(questions);
		shuffle_answers();

		self.answer = function(a) {
			if(self.r > -1)
				return;

			if(a === self.questions[self.i].a) {
				++self.stats.right;
				self.r = a;
			}
			else {
				++self.stats.wrong;
				self.r = self.questions[self.i].a;
				self.w = a;
			}

			$timeout(self.nextQuestion, 1500);
		};

		self.nextQuestion = function() {
			self.r = -1;
			self.w = -1;
			if (++self.i >= self.questions.length) {
				shuffle_questions(questions);
				self.i = 0;
				self.stats.right = 0;
				self.stats.wrong = 0;
			}
			shuffle_answers();
		};

	}

	QuizCtrl['$inject'] = ['$timeout', 'questions'];

	function QuizCtrlResolve($route, $http) {
		return $http.get('files/' + $route.current.params.file + '.json').then(function(response) {
			return response.data;
		});
	}

	QuizCtrlResolve['$inject'] = ['$route', '$http'];

	QuizCtrl.resolve = {
		'questions': QuizCtrlResolve
	};


	return QuizCtrl;
});
