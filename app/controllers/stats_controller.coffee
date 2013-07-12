load 'application'

before('load stats', ->
  Stats.findById(params.id, (err, stat) =>
    if err || !stat
      if !err && !stat && params.format == 'json'
        return send code: 404, error: 'Not found'
      redirect pathTo.stats
    else
      @stat = stat
      next()
  , only: ['show', 'edit', 'update', 'destroy'])
)

# action('new', ->
#   @stat = new Stat
#   render()
# )

action('create', ->
  Stat.create body.Stat, (err, stat) =>
    respondTo (format) =>
      format.json ->
        if err
          send code: 500, error: stat.errors || err
        else
          send code: 200, data: stat.toObject()
)

action('index', ->
  Stat.find (err, stats) =>
    @stats = stats
    respondTo (format) ->
      format.json ->
        send code: 200, data: stats
)

action('show', ->
  respondTo (format) =>
    format.json =>
      send code: 200, data: @stat
)

# action('edit', ->
#   respondTo (format) =>
#     format.json =>
#       send code: 200, data: @stat
# )

action('update', ->
  @stat.update body.Stat, (err) =>
    respondTo (format) =>
      format.json =>
        if err
          send code: 500, error: @stat.errors || err
        else
          send code: 200, data: @stat
)

action('destroy', ->
  @stat.destroy (error) ->
    respondTo (format) ->
      format.json ->
        if error
          send code: 500, error: error
        else
          send code: 200
)
