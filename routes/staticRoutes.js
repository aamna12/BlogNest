const express = require("express");
const staticRoute = express.Router();
const {getHomepage, getSignUpPage, createUser, getLoginPage, loginUser, logoutUser} = 
require('../controllers/staticControllers');


staticRoute.get('/', getHomepage);

staticRoute.get('/signup', getSignUpPage);
staticRoute.post('/signup', createUser);

staticRoute.get('/login', getLoginPage);
staticRoute.post('/login', loginUser);

staticRoute.get('/logout', logoutUser);

module.exports = staticRoute;