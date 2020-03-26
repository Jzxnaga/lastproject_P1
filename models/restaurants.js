'use strict';
module.exports = (sequelize, DataTypes) => {

  class Restaurants extends Model {

  }

  Restaurants.init({
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    email: DataTypes.STRING,
    rating: DataTypes.INTEGER
  },{sequelize})

  Restaurants.associate = function(models) {
    Restaurants.belongsToMany(models.Users,{
      through: models.Reviews,foreignKey:'RestaurantId'})
  };
  return Restaurants;
};