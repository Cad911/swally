module.exports = (compound) ->

  express = require 'express'
  app = compound.app

  require('./mongoose').init(compound)


  # ALLOW ACCESS TO URL LIKE A WEBSERVICE
  allowCrossDomain = (req, res, next) ->
    res.header 'Access-Control-Allow-Origin', '*'
    res.header 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'
    res.header 'Access-Control-Allow-Headers', 'Content-Type, X-Requested-With'
    next()


  app.configure ->
    app.enable 'coffee'

    app.set 'cssEngine', 'sass'
    app.set 'jsDirectory', '/backoffice/scripts/'
    app.set 'cssDirectory', '/backoffice/stylesheets/'

    # make sure you run `npm install railway-routes browserify`
    # app.enable 'clientside'
    app.use allowCrossDomain
    app.use express.static(app.root + '/public', maxAge: 0)
    app.use express.bodyParser()
    app.use express.cookieParser 'secret'
    app.use express.session secret: 'secret'
    app.use express.methodOverride()
    app.use app.router
