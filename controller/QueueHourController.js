const Queue = require('../model/Queue');

const getAllAvailable = async (req, res) => {
    let dateObj = req.query;
    console.log(dateObj);
    const structQueues = await Queue.find({date: dateObj.date});
    // console.log(structQueues);
    allQuese = [...structQueues];
    allQuese.push({startTime: 14, endTime: 15});
    // console.log(allQuese);

    let treatmentLong = Number(dateObj.treatmentLong);
    let available = [];
    let checkTime = 9;
    if(currDatetoString() === dateObj.date){
        checkTime = Math.max(9,roundTimeToNearest30Minutes());
    }
    console.log(checkTime);
    for(;(checkTime + treatmentLong) <= 20; checkTime += 0.5){
        let endTime = checkTime + treatmentLong;
        let ans = true;
        for(let i = 0; i < allQuese.length; ++i){
            if((endTime < allQuese[i].endTime && endTime > allQuese[i].startTime) ||(checkTime < allQuese[i].endTime && checkTime > allQuese[i].startTime)){
                ans = false;
                break;
            }
            if(checkTime <= allQuese[i].startTime && endTime >= allQuese[i].endTime){
                ans = false;
                break;
            }
        }
        if(ans) available.push(checkTime);
    }
    console.log(available);
    res.send(available);
    // if(available.length === 0){
    //     // res.redirect('/order');
    //     res.send([]);
    // }
    // else{
    //     res.send(available);
    //     // res.render('queueHour', {available});
    // }
}

// const storeHour = (req, res) => {
//     const selectedHoure = req.body.chosenHour;
//     let treatmentLong = req.session.queueDetails.treatmentLong;
//     console.log(selectedHoure);
//     req.session.queueDetails.startTime = Number(selectedHoure);
//     req.session.queueDetails.endTime = Number(selectedHoure) + Number(treatmentLong);
//     res.redirect('/confirm');
//   }

  function roundTimeToNearest30Minutes() {
    const now = new Date();
    const minutes = now.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 30) * 30;
    ans = now.getHours();

    if (roundedMinutes >= 60) {
        ans += 1;
    } else {
        ans += 0.5;
    }
    return ans;
}
function currDatetoString(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
}

module.exports = {getAllAvailable};

