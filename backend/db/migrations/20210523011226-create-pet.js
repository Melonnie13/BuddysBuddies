'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      petName: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      otherPets: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      temperament: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      specialCare: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      adoptable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      single: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        ifNotSingle: {
          type: DatatTypes.TEXT,
          allowNull: false
        }
        // *** Can I do this??? Ask a TA ***
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pets');
  }
};
