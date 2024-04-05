const path = require('path');
const Queue = require('../model/Queue');

const confirmQueue = (req, res) => {
    const queueObj  = req.session.queueDetails;
    console.log(queueObj);
    // res.sendFile(path.join(__dirname,'..', 'view', 'confirm.html'));
    res.render('confirm', { queueObj });
  }


const handleNewQueue = async (req, res) => {
   const Obj =  req.session.queueDetails;

    try {
        //create and store the new queue
        const result = await Queue.create({
            "username": req.user.username,
            "treatmentType": Obj.treatment,
            "treatmentLong": Obj.treatmentLong,
            "date": Obj.date,
            "startTime":  Obj.startTime,
            "endTime":  Obj.endTime
        });

        console.log(result);
        res.redirect('/order');
    } catch (err) {
        console.log(err);

    }
}
module.exports = {confirmQueue,handleNewQueue};
