// backend/routes/index.js

// in this file,
    // create an Express router,
    // create a test route,
    // and export the router at the bottom of the file.

const express = require('express');
const router = express.Router();

const apiRouter = require('./api');

router.use('/api', apiRouter);
// ^^ all of the URLs of the routes in the api router
//    will be prefixed with /api

router.get('/hello/world', function(req, res) {
  //^^ be sure to pay attention to the path;
  // remember I was at localhost5000/ and received
  // a 404 backend and a cannot GET / browser error
  // because I NEEDED to be at localhost5000/hello/world
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World');
});
//^^ I am setting a cookie on the response with
// the name of XSRF-TOKEN to the value of
// the req.csrfToken method's return
// then, I am sending the text 'Hello World!'
// as the response's body


module.exports = router;
