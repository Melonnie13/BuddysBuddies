// backend/routes/api/session.js
// holds the resources for the route paths that
// begin with /api/session

      // ****** IMPORTANT ******
 // USE these three FOR EVERY ROUTE TO CREATE A ROUTER

const express = require('express');
 // this is what we need to be able to access the express router

const asyncHandler = require('express-async-handler');
 // ^^ since I'm doing database stuff, I'll want some kind of asyncHandler
 // ^^ will wrap asynchronous route handlers and custom middlewares

const router = express.Router();
 //^^ creates an Express router

     //******* IMPORTANT ****** */

 // Take a second to import the database stuff I'll need
const { User } = require('../../db/models');

 // Here's also where I'd import other middleware
const { check } = require('express-validator');
//^^ used with handleValidationErrors to
// validate the body of a request.
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');


const validateLogin = [
  // ^^ checks to see if the keys credential and password are on the req.body
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors,
];


// Log in
router.post(
    //^^ add the POST/api/session route
    '/',
    validateLogin,
    //^^ the middleware that checks the keys on the req.body
    // for credential and password
    asyncHandler(async (req, res, next) => {
        //^^ wrapped in asyncHandler
      const { credential, password } = req.body;
      //^^ expects the body of the request to have these keys

      const user = await User.login({ credential, password });
      //^^ calls the login static method from the User model

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);
      // ^^ if there is a user returned from the login static method
      // then call setTokenCookie and return a
      // JSON response with the user information

      return res.json({
        user,
      });
    }),
  );

  // Log out
router.delete(
    // ^^ DELETE/api/session logout route
    // will remove the token cookie from the response
    // and return a JSON success message
    // asyncHandler not wrapped around this because
    // this handler isnt async
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

   // Restore session user
router.get(
    //^^ GET/api/session
    '/',
    restoreUser,
    //^^ to get the session user, connect the restoreUser middleware
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
      //^^ if there is not a session, it will
      //return a JSON with an empty object
    }
  );

module.exports = router;
