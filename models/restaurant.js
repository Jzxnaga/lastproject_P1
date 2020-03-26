'use strict';
module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    owner: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Restaurant.associate = function(models) {
    // associations can be defined here
    Restaurant.belongsToMany(models.User,{
      through:models.Review ,foreignKey:'RestaurantId'})
     Restaurant.hasMany(models.Review,{foreignKey:'RestaurantId'})
  };
  return Restaurant;
};