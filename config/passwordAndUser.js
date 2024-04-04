const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');

  function configurePassport(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    console.log('Attempting login with username:', username);
    const user = await User.findOne({username: username}).exec();
    if (!user) {
      console.log('Authentication failed for username:', username);
      return done(null, false, { message: 'Incorrect username' });
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      console.log('Authentication failed for username:', username);
      return done(null, false, { message: 'Incorrect password' });
    }
    console.log('Authentication successful for username:', username);
    return done(null, user);
  }));
}


module.exports = configurePassport;
