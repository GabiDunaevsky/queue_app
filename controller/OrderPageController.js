const storestreatment = (req, res) => {
  const selectedTreatment = req.body.group1;
  console.log(selectedTreatment);

  if (selectedTreatment === 'lakGel') {
    req.session.queueDetails = {treatment: 'סוג הטיפול: לק גל', treatmentLong: 1.5};
  } else if (selectedTreatment === 'Bnia') {
    req.session.queueDetails = {treatment: 'סוג הטיפול: לק גל ובנייה', treatmentLong: 2.5};
  }

  res.redirect('/queue');
}


module.exports = {storestreatment};