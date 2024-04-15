const path = require('path');
const Queue = require('../model/Queue');

// const confirmQueue = (req, res) => {
//     const queueObj  = req.session.queueDetails;
//     console.log(queueObj);
//     // res.sendFile(path.join(__dirname,'..', 'view', 'confirm.html'));
//     res.render('confirm', { queueObj });
//   }


const handleNewQueue = async (req, res) => {
   const Obj =  req.body;
   console.log(Obj);
   console.log(Obj.treatment);

    try {
        //create and store the new queue
        const result = await Queue.create({
            "firstName": req.user.firstName,
            "lastName": req.user.lastName,
            "username": req.user.username,
            "treatmentType": Obj.treatment,
            "treatmentLong": Obj.treatmentLong,
            "date": Obj.date,
            "startTime":  Obj.startTime,
            "endTime":  Obj.endTime
        });

        console.log(result);
        res.send('sucess to add appointment');
    } catch (err) {
        console.log(err);
    }
}
module.exports = {handleNewQueue};
