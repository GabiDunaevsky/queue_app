const storestreatment = (req, res) => {
  const selectedTreatment = req.body.group1;
  console.log(selectedTreatment);

  if (selectedTreatment === 'lakGel') {
    req.session.queueDetails = {treatment: 'סוג הטיפול: לק גל'};
  } else if (selectedTreatment === 'Bnia') {
    req.session.queueDetails = {treatment: 'סוג הטיפול: לק גל ובנייה'};
  }

  res.redirect('/queue');
}


module.exports = {storestreatment};