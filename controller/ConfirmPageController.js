const Queue = require('../model/Queue');

const handleNewQueue = async (req, res) => {
   const Obj = req.body;
   const existingQueue = await Queue.findOne({
    date: Obj.date,
    $or: [
        {
            startTime: { $lt: Obj.startTime }, // Check if your start time is before or equal to the existing queue's end time
            endTime: { $gt: Obj.startTime }   // Check if your start time is after or equal to the existing queue's start time
        },
        {
            startTime: { $lt: Obj.endTime },   // Check if your end time is before or equal to the existing queue's end time
            endTime: { $gt: Obj.endTime }      // Check if your end time is after or equal to the existing queue's start time
        },
        {
            startTime: Obj.startTime
        },
        {
            endTime: Obj.endTime
        }
    ]
});
    if(existingQueue){
        return res.send('התור לא פנוי יותר, בדוק אם התור קיים אצלך');
    }
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
        res.send('התור נוסף לרשימת התורים בהצלחה');
    } catch (err) {
        console.log(err);
    }
}
module.exports = {handleNewQueue};
