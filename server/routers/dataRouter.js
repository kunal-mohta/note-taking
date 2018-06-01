/* Packages */
const express = require('express');

/* External files */
const server = require('../server.js');

const dataRouter = express.Router();

function authenticateUser () {
  return true;
}

dataRouter.post ('/update', (req, res) => {
  if (authenticateUser) {
    let Users = server.user;
    
  }
  else {
    console.log('Unauthorized request');
    res.status(401)
    .send({
      message: 'You are unauthorized to make this request'
    });
  }
});

module.exports = dataRouter;