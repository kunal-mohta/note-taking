/* Packages */
const express = require('express');
const bcrypt = require('bcrypt');

const saltRounds = 10;

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
            bcrypt.compare(req.body.password, user.password)
            .then(
              (resBool) => {
                if (resBool) {
                  console.log('Successful Login');
                  res.status(200)
                  .send({
                    message: 'Successful login',
                    userData: user.data
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
            )
            .catch(
              (error) => console.log(error)
            );
          }
          else {
            console.log('User Not Found');
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
              res.status(409)
              .send({
                message: 'This username is taken. Try a different one.'
              });
            } 
            else {
              //creat a new user
              bcrypt.hash(req.body.password, saltRounds)
              .then(
                (hash) => {
                  Users.create(
                    {
                      username: req.body.username,
                      password: hash,
                      data: {
                        notes: [],
                        archived: []
                      }
                    },
                    (err, user) => {
                      if (err) {
                        console.log('Error creating the user');
                      }
                      else {
                        console.log('User successfully created');
                        res.status(200)
                        .send({
                          message: 'The user was successfully created',
                          userData: user.data
                        });
                      }
                    }
                  );
                }
              )
              .catch(
                (error) => console.log(error)
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