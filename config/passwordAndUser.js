const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const bcrypt = require('bcrypt');

  function configurePassport(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({username: username}).exec();
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
  }));
}


module.exports = configurePassport;
