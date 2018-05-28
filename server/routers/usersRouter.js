const express = require('express');
const app = express();
const path = require('path');

const usersRouter = express.Router();

usersRouter.post('/login', function( req, res) {
  console.log(req);
});

usersRouter.post('/signup', function (req, res) {
  console.log(req);
});

module.exports = usersRouter;