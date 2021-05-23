'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT
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
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};
