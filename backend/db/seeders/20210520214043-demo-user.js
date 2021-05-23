'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hasCouch: 'no',
        hashedPassword: bcrypt.hashSync('password'),
        hasHostedBefore: 'no'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hasCouch: 'yes',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        hasHostedBefore: 'yes'
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hasCouch: 'yes',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        hasHostedBefore: 'yes'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
