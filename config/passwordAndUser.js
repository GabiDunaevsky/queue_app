const LocalStrategy = require('passport-local').Strategy;
const users = [
    { id: 1, username: "gabi", password: "gab" }
  ];

function configurePassport(passport) {
  passport.use(new LocalStrategy((username, password, done) => {
    console.log('Attempting login with username:', username);
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      console.log('Authentication failed for username:', username);
      return done(null, false, { message: 'Incorrect username or password' });
    }
    console.log('Authentication successful for username:', username);
    return done(null, user);
  }));
}

module.exports = configurePassport;
