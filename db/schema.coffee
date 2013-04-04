# Example of model definition:
#
#define 'User', ->
#  property 'email', String, index: true
#  property 'password', String
#  property 'activated', Boolean, default: false
#


module.exports = (mongoose, compound)  ->
  Schema = mongoose.Schema

  CategorySchema = new Schema
    title : String

  PledgeSchema = new Schema
    title       : String
    description : String
    category    : type: Schema.ObjectId, ref: 'Category', required: true

  Category = mongoose.model 'Category', CategorySchema, 'Category'
  Category.modelName = 'Category'
  compound.models.Category = Category;

  Pledge = mongoose.model 'Pledge', PledgeSchema, 'Pledge'
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
