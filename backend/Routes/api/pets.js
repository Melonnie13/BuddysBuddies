// This is my pets route

// ****** IMPORTANT ******
 // USE these three FOR EVERY ROUTE TO CREATE A ROUTER

 const express = require('express');
 // this is what we need to be able to access the express router

 const asyncHandler = require('express-async-handler');
 // ^^ since I'm doing database stuff, I'll want some kind of asyncHandler
 // ^^ will wrap asynchronous route handlers and custom middlewares

 const router = express.Router();
 //^^ creates an Express router

    // **** Database Stuff **** //

 // Take a second to import the database stuff I'll need
 const { Pet } = require('../../db/models');

 //******* IMPORTANT ****** */

        // *** Middleware ***
 // Here's also where I'd import other middleware
// ** Say I want a route that grabs data only if a user is logged in
  // ** I can use the restoreUser and requireAuth middleware that I wrote as
  //    part of AuthenticateMe Part 1
// ** Prevent nonUsers from accessing userData or privateData in my DB

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validatePetCreate = [
  check('petName')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('Please provide a pet name.'),
  check('age')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please provide an age for the pet.'),
  check('sex')
    .exists({checkFalsy: true})
    .withMessage('Please choose the sex of the pet'),
  check('petType')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Please enter a pet type.'),
  check('otherPets')
    .exists({checkFalsy: true})
    .isLength({min: 2})
    .withMessage('Please let us know if this pet gets along with other pets and which types.'),
  check('temperament')
    .exists({checkFalsy: true})
    .isLength({min:10, max: 200})
    .withMessage('Answer must be more than 10 and less than 200 characters.'),
  handleValidationErrors,
];

router.get('', asyncHandler(async(req, res) => {
  const pets = await Pet.findAll();
  res.json(pets);
}));

// Sign up
router.post(
  //^^ POST/api/users signup route
  // '/new', ?????
  validatePetCreate,
  //^^ connects this route to this middleware

  asyncHandler(async (req, res) => {
      //using the asyncHandler fn
    const { petName, age, username } = req.body;
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

//requireAuth for only logged-in users to access this endpoint
//post and out requests would need validations if users are submitting data

module.exports = router;
