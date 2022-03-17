const express = require('express')
const {GetBills, InsertBills} = require('../controller/billController');
const { validateToken } = require('../Utilities/middleware');


const BillRoutes = express();

BillRoutes.get('/bills/:id', validateToken, GetBills)
BillRoutes.post('/bills/post', validateToken, InsertBills)

module.exports= BillRoutes