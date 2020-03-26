'use strict';
const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datausersjson = JSON.parse(fs.readFileSync('./users.json','utf8'));

    for (let i = 0 ; i < datausersjson.length ; i++ ){
      datausersjson[i].createdAt = new Date();
      datausersjson[i].updatedAt = new Date()
    }
    
    return queryInterface.bulkInsert('Users',datausersjson
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
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
