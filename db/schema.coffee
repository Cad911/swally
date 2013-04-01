# Example of model definition:
#
#define 'User', ->
#  property 'email', String, index: true
#  property 'password', String
#  property 'activated', Boolean, default: false
#


module.exports = (mongoose, compound)  ->
  Schema = mongoose.Schema

  CategoryModel = new Schema
    title : String

  PledgeModel = new Schema
    title       : String
    description  : String
    category   : [CategoryModel]

  Category = mongoose.model 'CategoryModel', CategoryModel
  Category.modelName = 'Category'
  compound.models.Category = Category;

  Pledge = mongoose.model 'PledgeModel', PledgeModel
  Pledge.modelName = 'Pledge'
  compound.models.Pledge = Pledge;

# Pledge = describe 'Pledge', ->
#     property 'pledge', String
#     property 'description', String
#     property 'categoryId', Number
#     set 'restPath', pathTo.pledges

# Category = describe 'Category', ->
#     property 'title', String
#     set 'restPath', pathTo.categories
