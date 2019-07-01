const express = require('express')
const user = require('./routes/user')
const app = express()

app.use(express.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Accept-Patch", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE, PATCH");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res, next) => {
    res.send('API root')
})

app.use('/user', user)

module.exports = {
    path: '/api',
    handler: app
}