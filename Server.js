const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
app.use(bodyParser.json());
app.use(cors());
const port = process.env.DEV_PORT;


app.get('/', (req,res) => {
    res.send('This is default get request without authentication');
})

app.use('/buyer', require('./routes/personRoutes'));
app.use('/seller', require('./routes/sellerRoutes'));
app.use('/seller/property', require('./routes/propertiesRoutes'));
app.use('/allproperty', require('./routes/propertiesRoutes'));

app.listen(port, ()=> {
    console.log('server started');
});
