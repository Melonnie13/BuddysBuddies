'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
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
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};
