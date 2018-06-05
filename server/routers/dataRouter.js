/* Packages */
const express = require('express');
const dataRouter = express.Router();

require('dotenv').config();

const dataController = require("../controllers/dataControllers");


dataRouter.post('/update', dataController.update);

dataRouter.post('/sessionLogin', dataController.sessionLogin);

module.exports = dataRouter;