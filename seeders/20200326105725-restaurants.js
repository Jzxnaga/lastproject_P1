'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datarestaurantsjson = JSON.parse(fs.readFileSync('./restaurants.json','utf8'));

    for (let i = 0 ; i < datarestaurantsjson.length ; i++ ){
      datarestaurantsjson[i].createdAt = new Date();
      datarestaurantsjson[i].updatedAt = new Date()
    }
    
    return queryInterface.bulkInsert('Restaurants',datarestaurantsjson
    , {});




    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
