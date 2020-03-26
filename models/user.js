'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model


  class User extends Model{

  }



 User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {sequelize});



  
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Restaurant,{
      through:models.Review, foreignKey:'UserId'})
      User.hasMany(models.Review,{foreignKey:'UserId'})
  };
  return User;
};