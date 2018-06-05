const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtPrivateKey = process.env.JWT_PVT_KEY || 'unsafe_private_key';

module.exports = function authenticateUser (req, res, next) {
    jwt.verify(
      req.body.jwt,
      jwtPrivateKey,
      (error, decoded) => {
        if (error) {
          console.log(error);
          res.status(500)
          .send({
            message: 'Internal Server Error: JWT verifcation error'
          });
        }
        else {
          if (decoded) {
            req.jwtData = decoded;
            next();
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