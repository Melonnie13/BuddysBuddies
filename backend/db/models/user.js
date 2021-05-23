'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
          // a ^^ custom validator needs to be created
          // for isNotEmail constraint
          // I can use the imported isEmail validation
          // from sequelize's package Validator
          // to check if the username is an email
          throw new Error('Cannot be an email.');
          // ^^ if it is, I throw an error message
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hasCouch: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    },
    hasHostedBefore: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.toSafeObject = function() { // remember, this cannot be an arrow function
    const { id, username, email } = this; // context will be the User instance
    return { id, username, email };
    //^^ this method returns an object with only the
    // User information that is safe to save to a JWT
  };

  User.prototype.validatePassword = function (password) {
    // ^^ accepts a password string and
    // returns true if there is a match
    return bcrypt.compareSync(password, this.hashedPassword.toString());
    // with the User instance's hashedPassword
    // otherwise it will return false
   };

   User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
   };
   //^^ returns a User with the id passed in

   User.login = async function ({ credential, password }) {
     // ^^ accepts an object with a credntial and password key
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      // method searches for one User with the specified credential
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      // ^^ if user is found then validate the password
      // by passing it into the instance's .validatePassword method
      return await User.scope('currentUser').findByPk(user.id);
      //^^ if the password is valid, then return the user by using the currentUser scope
    }
  };
  User.signup = async function ({ username, email, password }) {
    //           accepts an object ^^ with these keys
    const hashedPassword = bcrypt.hashSync(password);
    // ^^ hash the password using bcrypt
    const user = await User.create({
      // ^^ create a user with the following
      username,
      email,
      hashedPassword,
    });
    return await User.scope('currentUser').findByPk(user.id);
    // ^^ return the created user using the currentUser scope
  };


  return User;
};

// ^^ These scopes help protect sensitive user information that
// should not be exposed to other users.
// You will be using these scopes in the later sections.
