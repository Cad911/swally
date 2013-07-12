(function() {
  window.ourApp = angular.module('swallyApp', ['ngResource']);

  window.ourApp.config([
    '$httpProvider', function($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      return delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ]);

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
