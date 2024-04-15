import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../components/AppointmentContext';


function AppointmentDate(props){
    const { appointmentData, setAppointmentData } = useAppointment();
    const[appointmentDetails, setAppointmentDetails] = useState('לא נבחר סוג טיפול');
    const navigate = useNavigate();

    useEffect(() => {
        const checkDate = (event) => {
            const selectedDate = event.target.value;
            const today = new Date().setHours(0, 0, 0, 0);
            const selectedDateTime = new Date(selectedDate).setHours(0, 0, 0, 0);
            // const obj = appointmentData;
            // obj.date = selectedDate;
            setAppointmentData({...appointmentData, date: selectedDate});
            console.log(appointmentData);
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
        checkAuth();
        if(appointmentData.hasOwnProperty("treatment")){
            setAppointmentDetails(appointmentData.treatment);
        }
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
  const checkAuth = async ()=>{
    const res = await fetch('http://localhost:3500/queue', {
        method: 'GET',
        credentials: 'include' // This ensures that cookies are sent with the request
    });
    if (res.ok) {
        // Extract the response data using the appropriate method
        const data = await res.json(); // Assuming the response is plain text
        console.log(data);
        console.log(data.error);
        if (data.error === 'Not authorized') {
            navigate('/login', { replace: true });
        }
    }
  }
    const handleAppointment = (e) =>{
        e.preventDefault();
        if(document.getElementById('datepicker').value){
            console.log(appointmentData);
            navigate("/appointmentTime", { replace: true });
        }else{
            const form = e.target.form;
            form.reportValidity();
            return;
        }
                // postData(selectedValue);
        
    }
    return(
    <>
        <i>
            <h1>😊 שלום  {props.loggedInName} ,בחר תאריך עבור הטיפול</h1>
        </i>
        <form>
        <div>
            <label htmlFor="datepicker">Pick a date:</label>
            <input type="date" id="datepicker" name="datepicker" required onInput={(event) => checkDayOfWeek(event)}/>
        </div>
        {appointmentDetails}<br/>
        <label id="selectedDateDis"></label><br/><br/>
        <button type="submit" onClick={handleAppointment}>Continue</button>

        </form>
    </>
    )
};

export default AppointmentDate;