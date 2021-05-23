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
      type: INTEGER,
    },
    petId: {
      type: INTEGER,
    },
    userId: {
      type: INTEGER,
    }
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};
