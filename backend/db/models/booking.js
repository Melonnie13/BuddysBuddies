'use strict';

const { INTEGER } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    couchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    petId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};
