const User = require('../model/User');

const serializeUserFunction = (user, done) => {
    done(null, user.id);
  };
  
const deserializeUserFunction = async (id, done) => {
try {
    const user = await User.findOne({ _id: id }).exec();
    done(null, user);
} catch (error) {
    done(error, null);
}
};

  module.exports = {serializeUserFunction, deserializeUserFunction};

