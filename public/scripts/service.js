angular.module('pledgeServices', ['ngResource']).
  factory('Pledges', function ($resource) {
    return $resource('pledges.json', {}, {
      getAll: {method: 'GET'}
    });
  });