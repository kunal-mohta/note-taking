const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = require('../models/user');

const saltRounds = 10;
const jwtPrivateKey = process.env.JWT_PVT_KEY || 'unsafe_private_key';
const jwtExpireTime = 60*60; //in seconds

module.exports.login = (req, res) => {
    
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
  
                    //creating jwt
                    jwt.sign(
                      {
                        username: req.body.username,
                        password: req.body.password
                      },
                      jwtPrivateKey,
                      {
                        expiresIn: jwtExpireTime
                      },
                      (err, token) => {
                        if (err) {
                          console.log(err);
                          res.status(500)
                          .send({
                            message: 'Internal Server Error: JWT error'
                          });
                        }
                        else {
                          res.status(200)
                          .send({
                            message: 'Successful login',
                            userData: user.userData,
                            jwt: token
                          });
                        }
                      }
                    );
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
  };

module.exports.signup = (req, res) => {
      try {
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
                        userData: {
                          username: req.body.username,
                          notes: []
                        }
                      },
                      (err, user) => {
                        if (err) {
                          console.log('Error creating the user');
                        }
                        else {
                          console.log('User successfully created');
  
                          //creating jwt
                          jwt.sign(
                            {
                              username: req.body.username,
                              password: hash
                            },
                            jwtPrivateKey,
                            {
                              expiresIn: jwtExpireTime
                            },
                            (err, token) => {
                              if (err) {
                                console.log(err);
                                res.status(500)
                                .send({
                                  message: 'Internal Server Error: JWT error'
                                });
                              }
                              else {
                                res.status(200)
                                .send({
                                  message: 'The user was successfully created',
                                  userData: user.data,
                                  jwt: token
                                });
                              }
                            }
                          )
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
  };