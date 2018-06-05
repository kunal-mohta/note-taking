/* Packages */
const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/* External files */
const server = require('../server.js');

const jwtPrivateKey = process.env.JWT_PVT_KEY || 'unsafe_private_key';

const dataRouter = express.Router();

//authentication middleware


dataRouter.post ('/update', (req, res) => {
  let Users = server.users;

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
});

dataRouter.post('/sessionLogin', (req, res) => {
  let Users = server.users;

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
});

module.exports = dataRouter;