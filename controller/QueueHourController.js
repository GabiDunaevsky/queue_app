const m1 = {
    place: "jerusalem",
    name: "hani",
    startTime: 9,
    endTime: 11
    };
const m2 = {
    place: "jerusalem",
    name: "daniel",
    startTime: 14,
    endTime: 15
    };
const m3 = {
    place: "jerusalem",
    name: "gabi",
    startTime: 16,
    endTime: 17.5
    };
const m4 = {
    place: "jerusalem",
    name: "gabi",
    startTime: 18,
    endTime: 19.5
    };


const Queue = require('../model/Queue');

const getAllAvailable = async (req, res) => {
    let dateObj = req.session.queueDetails;
    const structQueues = await Queue.find({date: dateObj.date});
    allQuese = [... structQueues];
    allQuese.push({startTime: 14, endTime: 15});
    console.log(allQuese);

    let treatmentLong = dateObj.treatmentLong;
    console.log(treatmentLong);
    let available = [];
    for(let checkTime = 9; (checkTime + treatmentLong) <= 20; checkTime += 0.5){
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
    res.render('queueHour', {available});
}

const storeHour = (req, res) => {
    const selectedHoure = req.body.chosenHour;
    let treatmentLong = req.session.queueDetails.treatmentLong;
    console.log(selectedHoure);
    req.session.queueDetails.startTime = Number(selectedHoure);
    req.session.queueDetails.endTime = Number(selectedHoure) + Number(treatmentLong);
    console.log('bay');
    res.redirect('/confirm');
  }


// const findSpot = (treatmentLong) => {
//     const allQuese = [m2]
//     let available = [];
//     for(let checkTime = 9; (checkTime + treatmentLong) < 20; checkTime += 0.5){
//         let endTime = checkTime + treatmentLong;
//         let ans = true;
//         for(let i = 0; i < allQuese.length; ++i){
//             if((endTime < allQuese[i].endTime && endTime > allQuese[i].startTime) ||(checkTime < allQuese[i].endTime && checkTime > allQuese[i].startTime)){
//                 ans = false;
//                 break;
//             }
//             if(checkTime <= allQuese[i].startTime && endTime >= allQuese[i].endTime){
//                 ans = false;
//                 break;
//             }
//         }
//         if(ans) available.push(checkTime);
//     }
//     console.log(available);
// }


// findSpot(1.5);

module.exports = {getAllAvailable,storeHour};

