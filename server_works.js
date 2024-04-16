'use strict';
require('dotenv').config();
// imports
const express = require('express');
// const morgan = require('morgan');
// const {check, validationResult} = require('express-validator');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

//mongo
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const configurePassport = require('./config/passwordAndUser');

// Passport-related imports
const passport = require('passport');
// const LocalStrategy = require('passport-local');
const session = require('express-session');
const serialization = require('./config/serialization');

// init
const app = express();
const port = process.env.PORT || 3500;

connectDB();

// set up middlewares
app.use(express.json());
// app.use(morgan('dev'));
app.use(credentials);
//cors
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

//localStrategy
configurePassport(passport);

//serialization
passport.serializeUser(serialization.serializeUserFunction);
passport.deserializeUser(serialization.deserializeUserFunction);

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 24 * 60 * 60 * 1000}
}));
app.use(passport.authenticate('session'));

// routes
app.use('/', require('./routes/Opening'));
app.use('/myWorks', require('./routes/MyWorks'));
app.use('/auth', require('./routes/Auth'));
app.use('/register', require('./routes/Register'));
app.use('/user', require('./routes/api/AuthUser'));
app.use('/myQueues', require('./routes/MyQueues'));
app.use('/queueHour', require('./routes/QueueHour'));
app.use('/confirm', require('./routes/Confirm'));
app.use('/logout', require('./routes/LogOut'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});

