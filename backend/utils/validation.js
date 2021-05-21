// backend/utils/validation.js

const { validationResult } = require('express-validator');
// ^^ used with check to validate the req body
//  gathers the results of all check middlewares that were run
// to determine validity of parts of the body

//  check is a middleware function creator
//       that checks a particular key on the request body

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    //^^ define an Express middleware called handleValidationErrors

  const validationErrors = validationResult(req);
  // that will call validationResult ^^
  // when invoked with req, used with check to validate req.body

  if (!validationErrors.isEmpty()) {
      //^^ if there are validation errors
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);


    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
     //^^ create an error with all the validation error messages
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
