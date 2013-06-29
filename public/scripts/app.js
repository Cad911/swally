(function() {
  window.ourApp = angular.module('swallyApp', ['ngResource']);

  window.ourApp.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/_card.html',
        controller: 'PledgesCtrl'
      }).otherwise({
        redirectTo: '/'
      });
    }
  ]);

}).call(this);
