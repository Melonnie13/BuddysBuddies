// backend/routes/api/index.js

const router = require('express').Router();

module.exports = router;

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
  //^^ A router is created and
  // and API test route is added to the router.
  // the API test route is accepting reqs
  // with the URL path of /api/test with the
  // HTTP verb of POST.
  // It sends a JSON res containing
  // whatever is in the body of the req.


// The main purpose of this express app is to be a REST API server.
// All API routes will be served at URL's starting with /api/.


