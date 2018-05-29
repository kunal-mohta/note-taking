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
    
    Users.findOne(
      {
        'username' : req.body.username
      },
      (error, user) => {
        if (error) {
          console.log('Error with finding the user');
          console.log(error);
          res.status(500)
          .send({
            message: 'Internal Server Error: Contact the developer.'
          });
        }
        else {
          if (user) {
            if (user.password === req.body.password) {
              console.log('Successful Login');
              res.status(200)
              .send({
                message: 'Successful login'
              });
            }
            else {
              console.log('Wrong Password');
              res.status(403)
              .send({
                message: 'Wrong username or password'
                //because should not reveal what was wrong
              });
            }
          }
          else {
            console.log('User Not Fount');
            res.status(403)
            .send({
              message: 'Wrong username or password'
              //because should not reveal what was wrong
            });
          }
        }
      }
    )
  }
});

usersRouter.post ('/signup', (req, res) => {
  if (!server.dbConnection) {
    console.log('There is some problem with your database connection... Cannot send request to /users/signup');
  }
  else {
    try {
      let Users = server.users;

      Users.findOne(
        {
          'username' : req.body.username
        },
        (error, user) => {
          if (error) {
            console.log('Error with finding the user');
            console.log(error);
            res.status(500)
            .send({
              message: 'Internal Server Error: Contact the developer.'
            });
          }
          else {
            if (user) {
              //user already exists
              console.log('User with the username already exists');
              console.log(user);
              res.status(409)
              .send({
                message: 'This username is taken. Try a different one.'
              });
            } 
            else {
              //creat a new user
              Users.create(
                {
                  username: req.body.username,
                  password: req.body.password
                },
                (err, user) => {
                  console.log('User successfully created');
                  console.log(user);
                  res.status(200)
                  .send({
                    message: 'The user was successfully created'
                  });
                }
              );
            }
          }
        }
      );
    }
    catch (error) {
      console.log('User Router /signup error');
      console.log(error);
      res.status(500)
      .send({
        message: 'Internal Server Error: Contact the developer'
      });
    }
  }
});

module.exports = usersRouter;