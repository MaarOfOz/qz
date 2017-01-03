'use strict';

define(['angular'], function(angular) {
	function MenuCtrl($http) {
		var self = this;

		self.quizzes = [];

		$http.get('files/index.json').then(function(response) {
			self.quizzes = response.data;
		});
	}

	MenuCtrl['$inject'] = ['$http'];

	return MenuCtrl;
});
