const path = require('path');

const confirmQueue = (req, res) => {
    const queueObj  = req.session.queueDetails;
    console.log(queueObj);
    res.sendFile(path.join(__dirname,'..', 'view', 'confirm.html'));
  }

module.exports = {confirmQueue};