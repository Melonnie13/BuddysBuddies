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

