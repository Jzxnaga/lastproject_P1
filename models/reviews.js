'use strict';
module.exports = (sequelize, DataTypes) => {

  class Reviews extends Model{

  }

Reviews.init({
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Review: DataTypes.STRING,
    Rating: DataTypes.INTEGER
  }, {});

  Reviews.associate = function(models) {
    Reviews.belongsTo(models.Restaurants)
    Reviews.belongsTo(models.Users)

  };
  return Reviews;
};