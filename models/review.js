'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Restaurant,{foreignKey:'RestaurantId'})
    Review.belongsTo(models.User,{foreignKey:'UserId'})
  };
  return Review;
};