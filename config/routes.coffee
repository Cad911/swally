exports.routes = (map)->
  map.resources 'categories'

  map.resources 'pledges'

  map.resources 'stats'


  # Generic routes. Add all your routes below this line
  # feel free to remove generic routes
  map.all ':controller/:action'
  map.all ':controller/:action/:id'