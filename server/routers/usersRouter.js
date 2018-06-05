/* Packages */
const express = require('express');
const usersRouter = express.Router();
require('dotenv').config();

/* External files */
const Users = require('../models/user');
const userControllers = require('../controllers/userControllers');


usersRouter.post('/login', userControllers.login);

usersRouter.post('/signup', userControllers.signup);

module.exports = usersRouter;