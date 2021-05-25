// backend/routes/api/users.js
// holds the resources for the route paths that
// begin with /api/users

// ****** IMPORTANT ******
 // USE these three FOR EVERY ROUTE TO CREATE A ROUTER

const express = require('express');
// this is what we need to be able to access the express router

const asyncHandler = require('express-async-handler');
// ^^ since I'm doing database stuff, I'll want some kind of asyncHandler
// ^^ will wrap asynchronous route handlers and custom middlewares

const router = express.Router();
//^^ creates an Express router

    // **** Database ****

// Take a second to import the database stuff I'll need
const { User, Pet, Couch } = require('../../db/models');

//******* IMPORTANT ****** */


      // *** Middleware ***
// Here's also where I'd import other middleware
// ** Say I want a route that grabs data only if a user is logged in
  // ** I can use the restoreUser and requireAuth middleware that I wrote as
  //    part of AuthenticateMe Part 1
// ** Prevent nonUsers from accessing userData or privateData in my DB

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const couch = require('../../db/models/couch');


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
  // check('hasCouch')
  //   .exists({ checkFalsy: true})
  //   .withMessage('You must choose whether you have a couch available'),
  // check('hasHostedBefore')
  //   .exists({checkFalsy: true})
  //   .withMessage('You must choose whether you have hosted a pet before.'),
  handleValidationErrors,
];

// create API routes here

// get all my users
router.get('', asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json(users);
  // now since we arent sending any templates or pug stuff from our express,
  // we're mostly gonna use res.json
}))

// Sign up
router.post(
    //^^ POST/api/users signup route
    '/',
    validateSignup,
    //^^ connects this route to this middleware

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
          //^^ return a JSON response with the user information
        user,
      });
    }),
    // if the creation of a user is unsuccessful then
    // a Sequelize Validation error will be passed onto the
    // next error-handling middleware
  );

  // router.get('/:id', requireAuth, asyncHandler(async (req, res) => {

  // }));


module.exports = router;
