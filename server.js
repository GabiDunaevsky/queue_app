require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

//Authintication
const passport = require('passport');
const session = require('express-session');
const configurePassport = require('./config/passwordAndUser');
const serialization = require('./config/serialization');


const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();
// built-in middleware for json 
app.use(express.json());
app.use(morgan('dev'));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));



// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'view'));

configurePassport(passport);

passport.serializeUser(serialization.serializeUserFunction);
passport.deserializeUser(serialization.deserializeUserFunction);

// Set up session middleware
app.use(session({
    secret: "shhhhh... it's a secret!",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,
    maxAge: 24 * 60 * 60 * 1000}
  }));
  app.use(passport.authenticate('session'));

// Set up passport middleware
// app.use(passport.initialize());
// app.use(passport.session());



// //middleware for cookies
// app.use(cookieParser());


// Serve static files from the 'views' directory
// app.use(express.static(path.join(__dirname, 'view')));


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




// app.use(verifyJWT);
// app.use('/employees', require('./routes/api/employees'));
// app.use('/users', require('./routes/api/users'));

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'view', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



