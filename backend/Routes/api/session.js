// backend/routes/api/session.js
// holds the resources for the route paths that
// begin with /api/session

const express = require('express')
const asyncHandler = require('express-async-handler');
// ^^ will wrap asynchronous route handlers and custom middlewares

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();


// Log in
router.post(
    //^^ add the POST/api/session route
    '/',
    asyncHandler(async (req, res, next) => {
        //^^ wrapped in asyncHandler
      const { credential, password } = req.body;

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
