// backend/utils/auth.js
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    // ^^ TAKES IN THE RESPONSE AND SESSION USER and
    const token = jwt.sign(
        //generates a JWT using the imported secret.
      { data: user.toSafeObject() },
      // payload of the JWT ^^ that is in the User model
      secret,
      { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
    );
    //^^ setting the JWT cookie after a user is logged in or signed up
    // will be used in the login and signup routes later

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
      maxAge: expiresIn * 1000, // maxAge in milliseconds
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction && "Lax",
    });
    //^^ after the JWT is created, it's set to an
    // HTTP-only cookie on the response as a token.

    return token;
  };

  const restoreUser = (req, res, next) => {
      // token parsed from cookies
      const { token } = req.cookies;

      return jwt.verify(token, secret, null, async (err, jwtPayload) => {
          // ^^ verifies and parses JWT's payload
          // and searches the DB for User with the id in the payload
          if (err) {
              return next();
            }

            try {
                const { id } = jwtPayload.data;
                req.user = await User.scope('currentUser').findByPk(id);
                // since the hashedPassword isn't needed for this operation
                // we should use the currentUser scope
                // if a User is found, then we save the user to a key of user
                // onto the request - req.user
            } catch (e) {
                res.clearCookie('token');
                // if there is an error...
                return next();
            }

            if (!req.user) res.clearCookie('token');
            // or user cannot be found, then clear the token cookie from the response

            return next();
        });
    };
    // ^^ a middleware function that will RESTORE THE SESSION USER
    //      based on the contents of the JWT
    // will ve added as pre-middleware for route handlers and
    // for the following authentication middleware.

// If there is no current user, return an error
const requireAuth = [
    // ^^ an array with the restoreUser middleware function
    restoreUser,
    //   ^^ as the first element in the array
    // ensures that if a valid JWT cookie exists
    // the session user will be loaded into the req.user attribute.
    function (req, res, next) {
      if (req.user) return next();
      //^^ will check if req.user and
      // go to the next middleware if there is a session user present there

      const err = new Error('Unauthorized');
      // ^^ if there is no session user, then an error will be created
      err.title = 'Unauthorized';
      err.errors = ['Unauthorized'];
      err.status = 401;
      return next(err);
      // ^^ and passed along to the error-handling middlewares
    },
  ];
  // ^^ for requiring a session user to be authenticated before accessing a route

  // both restoreUser and requireAuth will be applied as
  // a pre-middleware to route handlers where needed

  const checkPermissions = (thing, currentUser) => {
    if (thing.userId !== currentUser) {
      const err = new Error('Illegal operation.');
      err.status = 403; // Forbidden
      throw err;
    }
  };

  module.exports = {setTokenCookie, restoreUser, requireAuth};
