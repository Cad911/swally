# window.ourApp.factory('Categories', ['$resource', ($resource)->
#     $resource('http://swally.herokuapp.com/categories/:categoryId.json',{categoryId: '@id', callback: "JSON_CALLBACK"}, {
#         getById: {method: 'JSONP', isArray: true}
#     })
# ])

angular.module('categoryServices', ['ngResource']).
    factory('Categories', ($resource)->
        return $resource('categories/:categoryId.json',{categoryId: '@id'}, {getById: {method: 'GET'}})
    )