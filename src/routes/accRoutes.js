const express = require('express');
const { GetAccIndex, InsertGroups } = require('../controller/AccContoller');
const { validateToken } = require('../Utilities/middleware');

const accRoutes = express();

accRoutes.get('/accounts/:user_id', validateToken, GetAccIndex);
accRoutes.post('/accounts/post', validateToken, InsertGroups);

module.exports = accRoutes;
