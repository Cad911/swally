# window.ourApp.factory('Pleges', ['$resource', ($resource)->
#     $resource('http://swally.herokuapp.com/pledges.json', {callback: "JSON_CALLBACK"},{
#       getAll: {method: 'JSONP'}
#     });
# ])

window.ourApp.factory('Pledges', ['$resource', ($resource)->
    # return $resource('/pledges.json', {}, {
    #   getAll: {method: 'GET'}
    # });
	return $resource('http://:url/pledges.json', {url: "swally.herokuapp.com"}, {
      getAll: {method: 'GET'}
    });
  ]);