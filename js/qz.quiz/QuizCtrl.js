'use strict';

define(['angular'], function(angular) {
	function QuizCtrl($timeout, questions) {
		var self = this;

		self.questions = questions;

		self.question = {
			'q': '',
			'a': '',
			'b': []
		};
		self.answers = [];

		self.state = '';

		self.i = 0;
		self.r = -1;
		self.w = -1;

		self.incorrectlyAnsweredQuestions = [];

		self.stats = {
			'right': 0,
			'wrong': 0
		};

		var shuffle = function(a) {
			for (var i = a.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var temp = a[i];
				a[i] = a[j];
				a[j] = temp;
			}
		};

		var start = function() {
			self.i = 0;
			self.question = {
				'q': '',
				'a': '',
				'b': []
			};
			self.answers = [];
			self.stats.right = 0;
			self.stats.wrong = 0;
			self.incorrectlyAnsweredQuestions = [];
			shuffle(self.questions);
			selectQuestion();
			self.state = 'checking';
		};
		var selectQuestion = function() {
			self.question = self.questions[self.i];
			self.answers = self.question.b.slice(0);
			self.answers.push(self.question.a);
			shuffle(self.answers);
		};
		var nextQuestion = function() {
			self.r = -1;
			self.w = -1;
			if (++self.i >= self.questions.length) {
				self.state = 'score';
				return;
			}
			selectQuestion();
		};

		start();

		self.start = start;

		self.answer = function(a) {
			if (self.r > -1) {
				return;
			}

			self.r = self.question.a;

			if (a === self.question.a) {
				++self.stats.right;
			} else {
				++self.stats.wrong;
				self.w = a;

				self.incorrectlyAnsweredQuestions.push({
					'q': self.question.q,
					'a': self.question.a,
					'w': a === -1 ? '-' : a
				});
			}

			$timeout(nextQuestion, 1500);
		};

		self.skip = function() {
			self.answer(-1);
		};

	}

	QuizCtrl['$inject'] = ['$timeout', 'questions'];

	function QuizCtrlResolve($route, $http) {
		return $http.get('files/quizzes/' + $route.current.params.file + '.json').then(function(response) {
			return response.data;
		});
	}

	QuizCtrlResolve['$inject'] = ['$route', '$http'];

	QuizCtrl.resolve = {
		'questions': QuizCtrlResolve
	};


	return QuizCtrl;
});
