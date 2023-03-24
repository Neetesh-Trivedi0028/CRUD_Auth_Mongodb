const express = require('express');
const app = express();
const fieldrouter = require('./route/route');
const userrouter = require('./route/route');
app.use(express.json());
// Route
app.use('/api',fieldrouter)
app.use('/api',userrouter);
module.exports = app;