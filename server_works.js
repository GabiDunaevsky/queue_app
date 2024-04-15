'use strict';
require('dotenv').config();
// imports
const express = require('express');
const morgan = require('morgan');
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
app.use(morgan('dev'));
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
}));
app.use(passport.authenticate('session'));

// routes
app.use('/', require('./routes/Opening'));
app.use('/myWorks', require('./routes/MyWorks'));
app.use('/auth', require('./routes/Auth'));
app.use('/register', require('./routes/Register'));
app.use('/order', require('./routes/Order'));
app.use('/myQueues', require('./routes/MyQueues'));
app.use('/queue', require('./routes/Queue'));
app.use('/queueHour', require('./routes/QueueHour'));
app.use('/confirm', require('./routes/Confirm'));
app.use('/logout', require('./routes/LogOut'));



// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'view', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

// start the server
// app.listen(port, () => 'API server started');
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
});

