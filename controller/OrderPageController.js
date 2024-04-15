// const storestreatment = (req, res) => {
//   // console.log(req.body);
//   // console.log("hey");
//   const {type} = req.body;
//   const selectedTreatment = type;
//   console.log(selectedTreatment);

//   if (selectedTreatment === 'lakGel') {
//     req.session.queueDetails = {treatment: 'סוג הטיפול: לק גל', treatmentLong: 1.5};
//   } else if (selectedTreatment === 'Bnia') {
//     req.session.queueDetails = {treatment: 'סוג הטיפול: לק גל ובנייה', treatmentLong: 2.5};
//   }
//   if(selectedTreatment === undefined){
//     res.send("אירע שגיאה נסה לבחור שנית");
//   }else{
//     res.send("success");
//   }
// }


// module.exports = {storestreatment};