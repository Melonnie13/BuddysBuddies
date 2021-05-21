// backend/routes/api/users.js
// holds the resources for the route paths that
// begin with /api/users

const express = require('express')
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();
//^^ creates an Express router

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors,
];

// Sign up
router.post(
    //^^ POST/api/users signup route
    '/',
    validateSignup,
    //^^ connexts this route to this middleware
    
    asyncHandler(async (req, res) => {
        //using the asyncHandler fn
      const { email, password, username } = req.body;
      // ^^ this route expects the req.body to have these keys
      // validateSignup middleware will check and validate these keys

      const user = await User.signup({ email, username, password });
      // ^^ call the signup static method on the User model

      await setTokenCookie(res, user);
      // if the user is successfully created, then call setTokenCookie

      return res.json({
          //^^ return a JSOn response with the user information
        user,
      });
    }),
    // if the creation of a user is unsuccessful then
    // a Sequelize Validation error will be passed onto the
    // next error-handling middleware
  );


module.exports = router;
