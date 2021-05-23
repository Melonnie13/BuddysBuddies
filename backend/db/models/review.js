'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT
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
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};
