'use strict';
module.exports = (sequelize, DataTypes) => {
  const Couch = sequelize.define('Couch', {
    couchName: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    petTypeOfCouch: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    otherPets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Couch.associate = function(models) {
    // associations can be defined here
  };
  return Couch;
};
