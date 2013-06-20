# window.ourApp.factory('Categories', ['$resource', ($resource)->
#     $resource('http://swally.herokuapp.com/categories/:categoryId.json',{categoryId: '@id', callback: "JSON_CALLBACK"}, {
#         getById: {method: 'JSONP', isArray: true}
#     })
# ])

window.ourApp.factory('Categories', ['$resource',($resource)->
    # return $resource('/categories/:categoryId.json',{categoryId: '@id'}, {getById: {method: 'GET'}})
    return $resource('http://:url/:categoryId.json',{url: "swally.herokuapp.com/categories" , categoryId: '@id'}, {getById: {method: 'GET'}})
])