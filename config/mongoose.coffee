exports.init = (compound) =>
    conf = require('./database.coffee')[compound.app.set 'env' ]
    mongoose = require 'mongoose'
    mongoose.connect conf.url
    mongoose.connection.on 'error', =>
      return
    require(compound.root + '/db/schema')(mongoose, compound)
