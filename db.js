const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {});
const db = mongoose.connection;

db.on('disconnected', ()=> {
    console.log('Database disconnected successfully');
});

db.on('connected', ()=> {
    console.log('Database connected successfully');
});

db.on('error', (error) => {
    console.log('Some error occured');
    console.log(error);
});

module.exports = db;