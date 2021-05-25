'use strict';

const types = [
  'dog',
  'cat',
  'guinea pig'
];

module.exports = (sequelize, DataTypes) => {
  // const PetType = sequelize.define('PetType', {
  //   types: DataTypes.ARRAY
  // }, {});
  // PetType.associate = function(models) {
  //   // associations can be defined here
  // };
  // return PetType;

  return sequelize.define('__types__', {});
};

module.exports.types = types;
