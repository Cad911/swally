load 'application'

before 'load category', ->
  Category.find params.id, (err, category) =>
    if err || !category
      if !err && !category && params.format == 'json'
        return send code: 404, error: 'Not found'
      redirect pathTo.categories
    else
      @category = category
      next()
, only: ['show', 'edit', 'update', 'destroy']

action 'new', ->
  @category = new Category
  @title = 'New category'
  render()

action 'create', ->
  Category.create body.Category, (err, category) =>
    respondTo (format) =>
      format.json ->
        if err
          send code: 500, error: category.errors || err
        else
          send code: 200, data: category.toObject()
      format.html =>
        if err
          flash 'error', 'Category can not be created'
          @category = category
          @title = 'New category'
          render 'new'
        else
          flash 'info', 'Category created'
          redirect pathTo.categories

action 'index', ->
  Category.all (err, categories) =>
    @categories = categories
    @title = 'Category index'
    respondTo (format) ->
      format.json ->
        send code: 200, data: categories
      format.html ->
        render categories: categories

action 'show', ->
  @title = 'Category show'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @category
    format.html ->
      render()

action 'edit', ->
  @title = 'Category edit'
  respondTo (format) =>
    format.json =>
      send code: 200, data: @category
    format.html ->
      render()

action 'update', ->
  @category.updateAttributes body.Category, (err) =>
    respondTo (format) =>
      format.json =>
        if err
          send code: 500, error: @category.errors || err
        else
          send code: 200, data: @category
      format.html =>
        if !err
          flash 'info', 'Category updated'
          redirect path_to.category(@category)
        else
          flash 'error', 'Category can not be updated'
          @title = 'Edit category details'
          render 'edit'

action 'destroy', ->
  @category.destroy (error) ->
    respondTo (format) ->
      format.json ->
        if error
          send code: 500, error: error
        else
          send code: 200
      format.html ->
        if error
          flash 'error', 'Can not destroy category'
        else
          flash 'info', 'Category successfully removed'
        send "'" + path_to.categories + "'"
