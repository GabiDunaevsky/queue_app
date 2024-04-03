require('dotenv').config();
const express = require('express');
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
const LocalStrategy = require('passport-local').Strategy;
const configurePassport = require('./config/passwordAndUser');

const PORT = process.env.PORT || 3500;

// Connect to MongoDB
// connectDB();


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Set up session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Mock user database
const users = [
    { id: 1, username: 'gabi', password: 'gab' }
  ];

configurePassport(passport);


// //middleware for cookies
// app.use(cookieParser());

//serve static files
// app.use('/', express.static(path.join(__dirname, '/public')));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});


  
  // Serve static files from the 'views' directory
  app.use(express.static(path.join(__dirname, 'view')));


// routes
app.use('/', require('./routes/Opening'));
app.use('/myWorks', require('./routes/MyWorks'));
app.use('/auth', require('./routes/Auth'));
app.use('/register', require('./routes/Register'));
app.use('/order', require('./routes/Order'));
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

// mongoose.connection.once('open', () => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



