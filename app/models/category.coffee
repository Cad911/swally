module.exports = (compound, Category) ->
  Pledge = compound.models.Pledge
  Category.hasMany Pledge, as: 'pledges',  foreignKey: 'categorizedId'