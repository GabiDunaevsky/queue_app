const storesDate = (req, res) => {
    let dateObj = req.session.queueDetails;
    if(dateObj && dateObj.treatment !== undefined){
        const selectedDate = req.body.datepicker; 
        // const parts = selectedDate.split('-');
        // dateObj.year = parts[0];
        // dateObj.month = parts[1];
        // dateObj.day = parts[2];
        dateObj.date = selectedDate;
        
        req.session.queueDetails = dateObj;
        res.redirect('/queueHour');
    }
    else{
        res.redirect('/order');
    }
}

module.exports = {storesDate};