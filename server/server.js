const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersRouter = require('./routers/usersRouter.js');

app.use('/users', usersRouter);

//Starting the express server
const PORT = 5000;

app.listen(PORT, function (error) {
  if(error) console.log(error);
  else console.log(`Express server listening at port ${PORT}`);
});