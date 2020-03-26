'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datareviewsjson = JSON.parse(fs.readFileSync('./reviews.json','utf8'));
    for (let i = 0 ; i < datareviewsjson.length ; i++ ){
      datareviewsjson[i].createdAt = new Date();
      datareviewsjson[i].updatedAt = new Date()
    }
    
    return queryInterface.bulkInsert('Reviews',datareviewsjson
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
    return queryInterface.bulkDelete('Reviews', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
