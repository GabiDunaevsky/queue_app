const Queue = require('../model/Queue');
const moment = require('moment-timezone');

const getAllFuter = async (req, res) => {
try{
    // You can cancel a queue only a day before not at the same date.
    const username = req.user.username;
    const currentDate = moment().tz('Asia/Jerusalem').toDate();
    const structFutureQueues = await Queue.find({username: username, date:{ $gte: currentDate}});
    structFutureQueuesFormat = [];
    structFutureQueues.forEach(queue => {
        structFutureQueuesFormat.push(
            {
                id: queue._id,
                date: formatDate(queue.date),
                startTime: formatTime(queue.startTime)
            }        
    )});
    structFutureQueuesFormat.forEach(queue => {
        console.log(queue);
    });

    res.render('futureQueues', { queues: structFutureQueuesFormat });
    } catch (error) {
        console.error('Error retrieving future queues:', error);
        res.status(500).send('Internal server error');
    }
    
}

 // Define the formatDate function
 function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`)
    return `${day}/${month}/${year}`;
}

// Define the formatTime function
function formatTime(time) {
    if(time - Math.floor(time) > 0){
        return Math.floor(time) +':30';
    }else{
        return time + ':00';
    }
}

const deleteQueue = async (req, res) => {
    try {
        console.log("hey");
        const queueId = req.body.queueId;
        await Queue.findByIdAndDelete(queueId);
        res.redirect('/order');
    } catch (error) {
        console.error('Error deleting queue:', error);
        res.status(500).send('Internal server error');
    }



}

module.exports = {getAllFuter,deleteQueue};