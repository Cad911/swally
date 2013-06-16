# window.ourApp.factory('Pleges', ['$resource', ($resource)->
#     $resource('http://swally.herokuapp.com/pledges.json', {callback: "JSON_CALLBACK"},{
#       getAll: {method: 'JSONP'}
#     });
# ])

angular.module('pledgeServices', ['ngResource']).
  factory('Pledges', ($resource)->
    return $resource('pledges.json', {}, {
      getAll: {method: 'GET'}
    });
  );