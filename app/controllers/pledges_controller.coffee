load 'application'

before 'load pledge', ->
  Pledge.find params.id, (err, pledge) =>
    if err || !pledge
      if !err && !pledge && params.format == 'json'
        return send code: 404, error: 'Not found'
      redirect pathTo.pledges
    else
      @pledge = pledge
      next()
, only: ['show', 'edit', 'update', 'destroy']

before 'edit, new, update and create pledge', ->
  Category.all (err, categories) =>
    if err || !categories
      if !err && !categories && params.format == 'json'
        return send code: 404, error: 'Not found'
    @categories = categories || [] 
    next()
, only: ['new', 'edit', 'create', 'update']

before 'show pledge', ->
  category_id = @pledge.categoryId
  Category.find category_id, (err, category) =>
    @category = category || []
    next()
, only: ['show']

action 'new', ->
  @pledge = new Pledge
  @title = 'New pledge'
  render()

action 'create', ->
  Pledge.create body.Pledge, (err, pledge) =>
    respondTo (format) =>
      format.json ->
        if err
          send code: 500, error: pledge.errors || err
        else
          send code: 200, data: pledge.toObject()
      format.html =>
        if err
          flash 'error', 'Pledge can not be created'
          @pledge = pledge
          @title = 'New pledge'
          render 'new'
        else
          flash 'info', 'Pledge created'
          redirect pathTo.pledges

action 'index', ->
  Pledge.all (err, pledges) =>
    @pledges = pledges
    @title = 'Pledge index'
    respondTo (format) ->
      format.json ->
        send code: 200, data: pledges
      format.html ->
        render pledges: pledges

action 'show', ->
  @title = 'Pledge show'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @pledge
    format.html ->
      render()

action 'edit', ->
  @title = 'Pledge edit'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @pledge
    format.html ->
      render()

action 'update', ->
  console.log body.Pledge
  @pledge.updateAttributes body.Pledge, (err) =>
    respondTo (format) =>
      format.json =>
        if err
          send code: 500, error: @pledge.errors || err
        else
          send code: 200, data: @pledge
      format.html =>
        if !err
          flash 'info', 'Pledge updated'
          redirect path_to.pledge(@pledge)
        else
          flash 'error', 'Pledge can not be updated'
          @title = 'Edit pledge details'
          render 'edit'

action 'destroy', ->
  @pledge.destroy (error) ->
    respondTo (format) ->
      format.json ->
        if error
          send code: 500, error: error
        else
          send code: 200
      format.html ->
        if error
          flash 'error', 'Can not destroy pledge'
        else
          flash 'info', 'Pledge successfully removed'
        send "'" + path_to.pledges + "'"
