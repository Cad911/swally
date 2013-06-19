window.ourApp = angular.module('swallyApp', ['ngResource'])

window.ourApp.config(['$routeProvider', ($routeProvider)->
    $routeProvider
      .when('/', {
        templateUrl: 'views/_card.html',
        controller: 'PledgesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
])


