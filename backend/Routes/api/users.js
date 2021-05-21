// backend/routes/api/users.js
// holds the resources for the route paths that
// begin with /api/users

const express = require('express')
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();
//^^ creates an Express router

// Sign up
router.post(
    //^^ POST/api/users route
    '/',
    asyncHandler(async (req, res) => {
        //using the asyncHandler fn
      const { email, password, username } = req.body;
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
