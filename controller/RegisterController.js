const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password, phonenumber } = req.body;
    if (!username || !password || !phonenumber) return res.status(400).json({ 'message': 'Username, password and phonenNumber are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate){
        return res.redirect('/register');
    } 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            "username": username,
            "password": hashedPwd,
            "phoneNumber": phonenumber
        });

        console.log(result);

        res.redirect('/auth');
    } catch (err) {
        console.log(err);

    }
}
module.exports = { handleNewUser };