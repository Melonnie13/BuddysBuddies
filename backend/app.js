// here is where I initialize my Express application
// set up all the PRE-REQUEST middleware

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const {environment} = require('./config');
//^^ environment: process.env.NODE_ENV || 'development', in the
// './config/index.js'

const isProduction = environment === 'production';
//^^ create a variable isProduction that will be true
// if the environment is in production or not
// by checking the environment key in the configuration file
// ('backend/config/index.js').

const app = express();
//^^ initialize the Express application

app.use(morgan('dev'));
//^^ connect the morgan middleware for logging information about requests and responses

app.use(cookieParser());
//^^ add the cookie-parser middleware for parsing cookies

app.use(express.json());
//^^ middleware for parsing JSON bodies of requests
//   with Content-Type of application/json

// Security Middleware
if (!isProduction) {
    app.use(cors());
    //^^ enable cors only in development;
    // environment === development in '/config/index.js'
}

//helmet helps set a variety of headers to better secure your app
app.use(helmet({
    contentSecurityPolicy: false
}));

// Set the _crsf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && 'Lax',
            httpOnly: true,
            //^^ this means the cookie is http-only and can't be read by JS
            // csrf adds a _csrf cookie to any server response
            //  it also adds a method on all requests (req.csrfToken)
            //  that will be set to another cookie (XSRF-TOKEN)

            // XSRF and csrf are two cookies that work together to provide CSRF protection for app

            // XSRF needs to be sent in the HEADER OF ANY request
                // with all HTTP verbs besides GET.

                // header will be used to validate the _csrf cookie
                  // to confirm that the request comes from my site and not an unauth site

        },
    })
);

app.use(routes);
//^^ Connect all the routes

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });
  //^^ Catch unhandled requests and
  //   forward to error handler.

  // *** next invoked with nothing means that
        // error handlers defined after
        // this middleware will not be invoked.
        // next passes the error on to the next handler.
        // so it it is invoked with (err) then
        // error handlers after this middleware will be invoked.

const { ValidationError } = require('sequelize');

// ...

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        // ValidationError is from the sequelize package
    err.errors = err.errors.map((e) => e.message);
    err.title = 'Validation error';
    // so if the errror called is an instance of Validation Error
    // then the keys, title (a string) and errors (an array)
    // are added to the error and passed into the next
    // error handling middleware
    }
    next(err);
});
//^^ for catching Sequelize errors
// and formatting them before sending the error response.

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      title: err.title || 'Server Error',
      message: err.message,
      errors: err.errors,
      stack: isProduction ? null : err.stack,
    });
  });
  //^^ The last error handler is for formatting all the errors;
  //    BEFORE returning a JSON response.
  // The JSON response will include:
  //    the error message
//      errors array
//      error stack trace (if in development)
//      with the status code of the error


module.exports = app;
// ^^ finished setting up Express application
