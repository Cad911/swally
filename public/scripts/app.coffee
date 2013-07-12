window.ourApp = angular.module('swallyApp', ['ngResource'])


window.ourApp.config(['$httpProvider', ($httpProvider)->
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
])

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


