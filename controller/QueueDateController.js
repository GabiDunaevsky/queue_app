// const storesDate = (req, res) => {
//     let dateObj = req.session.queueDetails;
//     if(dateObj && dateObj.treatment !== undefined){
//         const selectedDate = req.body.datepicker; 
//         dateObj.date = selectedDate;
        
//         req.session.queueDetails = dateObj;
//         res.redirect('/queueHour');
//     }
//     else{
//         res.redirect('/order');
//     }
// }

// module.exports = {storesDate};