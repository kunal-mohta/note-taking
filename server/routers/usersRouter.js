/* Packages */
const express = require('express');
const app = express();
const path = require('path');

/* External files */
const server = require('../server.js');

const usersRouter = express.Router();

usersRouter.post ('/login', (req, res) => {
  if (!server.dbConnection) {
    console.log('There is some problem with your database connection... Cannot send request to /users/login');
  }
  else {
    let Users = server.users;
    
    console.log(req);
  }
});

usersRouter.post ('/signup', (req, res) => {
  if (!server.dbConnection) {
    console.log('There is some problem with your database connection... Cannot send request to /users/signup');
  }
  else {
    let Users = server.users;

    Users.findOne(
      {
        'username' : req.body.username
      },
      (e, user) => {
        if (user) {
          console.log('exits');
        } 
        else {
          Users.create(
            {
              username: req.body.username,
              password: req.body.password
            },
            (e, user) => {
              console.log(user);
            }
          );
        }
      }
    );
  }
});

module.exports = usersRouter;