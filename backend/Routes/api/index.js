// backend/routes/api/index.js

const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

//^^ connects all the routes exported from the session and users files



module.exports = router;








// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });
//   //^^ A router is created and
//   // and API test route is added to the router.
//   // the API test route is accepting reqs
//   // with the URL path of /api/test with the
//   // HTTP verb of POST.
//   // It sends a JSON res containing
//   // whatever is in the body of the req.


// The main purpose of this express app is to be a REST API server.
// All API routes will be served at URL's starting with /api/.

// Add a test route to test setTokenCookie function by getting the demo user
// and calling setTokenCookie

// // GET /api/set-token-cookie
// const asyncHandler = require('express-async-handler');
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', asyncHandler(async (req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       },
//     })
//   setTokenCookie(res, user);
//   return res.json({ user });
// }));


// // GET /api/restore-user
// const { restoreUser } = require('../../utils/auth.js');
// router.get(
//   '/restore-user',
//   restoreUser,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
//^^ tests the restoreUser middleware by
// connecting the middleware and checking whether
// or not the req.user key has been populated by the middleware properly.

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );
// ^^ test for requireAuth - if no session user the route will return an "Unauthorized" error
