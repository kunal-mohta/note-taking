const Users = require('../models/user');

require('dotenv').config();

module.exports.update = (req, res) => {
  
    Users.findOneAndUpdate(
      {
        username: req.jwtData.username
      },
      {
        userData: req.body.userData
      },
      (error, user) => {
        if (error) {
          res.status(500)
          .send({
            message: 'Error finding and updating user data'
          });
        }
        else {
          if (user) {
            res.status(200)
            .send({
              message: 'Successful information update'
            });
          }
          else {
            res.status(404)
            .send({
              message: 'User does not exist'
            });
          }
        }
      }
    )
  }

module.exports.sessionLogin = (req, res) => {
  
    Users.findOne(
      {
        username: req.jwtData.username
      },
      (error, user) => {
        if (error) {
          res.status(500)
          .send({
            message: 'Internal Server Error : Error finding user'
          });
        }
        else {
          if (user) {
            res.status(200)
            .send({
              message: 'Successful Login',
              userData: user.userData
            })
          }
          else {
            console.log('Unauthorized request');
            res.status(401)
            .send({
              message: 'You are unauthorized to make this request'
            });
          }
        }
      }
    )
  }