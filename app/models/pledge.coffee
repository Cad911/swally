module.exports = (compound, Pledge) ->
	Category = compound.models.Category
	Pledge.belongsTo Category, as: 'categorized',  foreignKey: 'categoryId'