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
    set 'restPath', pathTo.pledges

