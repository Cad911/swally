# Example of model definition:
#
#define 'User', ->
#  property 'email', String, index: true
#  property 'password', String
#  property 'activated', Boolean, default: false
#

Pledge = describe 'Pledge', ->
    property 'pledge', String
    property 'description', String
    property 'categoryId', Number
    set 'restPath', pathTo.pledges

Category = describe 'Category', ->
    property 'title', String
    set 'restPath', pathTo.categories
