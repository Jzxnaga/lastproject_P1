'use strict';
module.exports = (sequelize, DataTypes) => {

  class Users extends Model {

  }

  Users.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.STRING
  }, {sequelize});
  Users.associate = function(models) {
    Restaurants.belongsToMany(models.Users,{
      through: models.Reviews,foreignKey:'RestaurantId'})
  };
  return Users;
};