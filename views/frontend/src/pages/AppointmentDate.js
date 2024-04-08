import React, { useEffect } from 'react';


function AppointmentDate(){

    useEffect(() => {
        const checkDate = (event) => {
            const selectedDate = event.target.value;
            const today = new Date().setHours(0, 0, 0, 0);
            const selectedDateTime = new Date(selectedDate).setHours(0, 0, 0, 0);
            if (selectedDateTime < today) {
                alert("Please select a date from today or in the future.");
                event.target.value = ''; // Clear the input value
            } else {
                const dateParts = selectedDate.split('-');
                const day = dateParts[2];
                const month = dateParts[1];
                const year = dateParts[0];
                document.getElementById('selectedDateDis').innerText = 'Picked Date: ' + day + '/' + month + '/' + year;
            }
        };

        const datepicker = document.getElementById('datepicker');
        datepicker.addEventListener('change', checkDate);
    }, []);
  
    function checkDayOfWeek(event) {
      const selectedDate = new Date(event.target.value);
      const dayOfWeek = selectedDate.getDay();
      if (dayOfWeek === 5 || dayOfWeek === 6) { // Friday or Saturday
          event.target.value = ''; // Clear the input value
          alert("Please select a date from Sunday to Thursday.");
      }
  }
    return(
    <>
        <i>
            <h1>AppointmentDate</h1>
        </i>
        <div>
            <label htmlFor="datepicker">Pick a date:</label>
            <input type="date" id="datepicker" name="datepicker" required onInput={(event) => checkDayOfWeek(event)}/>
        </div>
        <label id="selectedDateDis"></label><br/><br/>
        <a href="./appointmentTime">
            <button type="submit">Continue</button>
        </a>
    </>
    )
};

export default AppointmentDate;