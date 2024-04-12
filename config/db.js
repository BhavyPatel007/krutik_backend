const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Bhavy:test@cluster0.nsatcxn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
