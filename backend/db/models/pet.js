'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define('Pet', {
    petName:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    petType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherPets: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperament: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    specialCare: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tricks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    adoptable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    single: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      // ifNotSingle: {
      //   type: DataTypes.TEXT,
      //   allowNull: false
      // }
      // ***** can I do this?? Ask a TA ****
    }
  }, {});

  Pet.associate = function(models) {
    // associations can be defined here
    // Pet.belongsToMany(models.)
  };
  return Pet;
};
