/* Packages */
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//Body parser to parse response body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Global Variables */
let DB_CONNECTION = 0; //boolean to keep track of when connection to db is established


/* Module Exports */
module.exports.dbConnection = DB_CONNECTION;


/* Routers */
const usersRouter = require('./routers/usersRouter.js');
app.use('/users', usersRouter);


/* Mongoose */

//url of database to connect to (will depend on whether local or global database is being used)
const dburl = 'mongodb://localhost/note-app';

//Establish connection to the database
mongoose.connect(dburl);

//Creating db and checking connection
var db = mongoose.connection;

db.on('error', (error) => {
  console.log('Error connecting to the database... \n' + error);
});

//Callback for after connection is established
db.once('open', () => {
  console.log('Successful connection to the database...');
  DB_CONNECTION = 1;
  module.exports.dbConnection = DB_CONNECTION;

  //User Schema
  const userSchema = new mongoose.Schema({
    username: String,
    password: String
  });

  //User Model
  const User = mongoose.model('User', userSchema);

  //Exporting the model
  module.exports.users = User;
});


/* Starting the express server */
const PORT = 5000;
app.listen(PORT, (error) => {
  if (error) console.log(error);
  else console.log(`Express server listening at port ${PORT}`);
});