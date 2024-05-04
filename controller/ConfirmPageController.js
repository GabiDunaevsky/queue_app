const Queue = require('../model/Queue');

const handleNewQueue = async (req, res) => {
   const Obj = req.body;
   const existingQueue = await Queue.findOne({
    date: Obj.date,
    $or: [
        {
            startTime: { $lt: Obj.startTime }, 
            endTime: { $gt: Obj.startTime }  
        },
        {
            startTime: { $lt: Obj.endTime }, 
            endTime: { $gt: Obj.endTime }     
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
