const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const Obj = req.body;
    console.log(Obj);
    if (!Obj.firstName || !Obj.lastName || !Obj.email || !Obj.password || !Obj.phoneNumber) return res.json({ 'message': 'All details are requierd' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: Obj.email }).exec();
    if (duplicate){
        return res.json({ 'message': 'User already exists!' });
    } 
    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(Obj.password, 10);

        //create and store the new user
        const result = await User.create({
            "firstName" : Obj.firstName,
            "lastName" : Obj.lastName,
            "username": Obj.email,
            "password": hashedPwd,
            "phoneNumber": Obj.phoneNumber
        });

        console.log(result);
        res.json({ 'message': 'Added successfuly'});
    } catch (err) {
        console.log(err);
    }
}
module.exports = {handleNewUser};