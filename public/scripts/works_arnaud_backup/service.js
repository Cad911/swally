angular.module('pledgeServices', ['ngResource']).
  factory('Pledges', function ($resource) {
    return $resource('pledges.json', {}, {
      getAll: {method: 'GET'}
    });
  });

angular.module('categoryServices', ['ngResource']).
  factory('Categories', function ($resource) {
    return $resource('categories/:categoryId.json',
      {categoryId: '@id'}, {
        getById: {method: 'GET'}
    });
  });