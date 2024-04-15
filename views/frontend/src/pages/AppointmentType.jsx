import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../components/AppointmentContext';

function AppointmentType(props){
    const { appointmentData, setAppointmentData } = useAppointment();
    const[error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const checkAuth = async ()=>{
            const res = await fetch('http://localhost:3500/order', {
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
        checkAuth()},[]);

    

    const handleTreatment = (e) =>{
        e.preventDefault();
        const selectedTreatment = document.querySelector('input[name="group1"]:checked');
        if (selectedTreatment) {
            const selectedValue = selectedTreatment.value;
            if (selectedValue === 'lakGel') {
                setAppointmentData({treatment: 'סוג הטיפול: לק גל', treatmentLong: 1.5});
              } else if (selectedValue === 'Bnia') {
                setAppointmentData({treatment: 'סוג הטיפול: לק גל ובנייה', treatmentLong: 2.5});
              }
              navigate('/appointmentDate', { replace: true });
        }else{
            const form = e.target.form;
            form.reportValidity();
            return;
        }
    }

    return(
    <>
        <i>
            <h1> 😊 שלום {props.loggedInName} , בחר טיפול בבקשה</h1>
        </i>
        <form>
            <div htmlFor="lakGel">סוג הטיפול: לק ג' ל<br/> 
            מחיר הטיפול: 120 ש"ח
            <br/>
            משך הטיפול: שעה וחצי
            </div>
            <input id="lakGel" type="radio" value="lakGel" name="group1" required /><br/>
            <div htmlFor="Bnia"> סוג הטיפול: לק ג'ל ובנייה
                <br/>
                מחיר הטיפול: 150 ש"ח
                <br/>
                משך הטיפול: שעתיים
            </div>
            <input id="Bnia" type="radio" value="Bnia" name="group1" required /><br/>
            <button type="submit" id="continueBtn" onClick={handleTreatment}>Continue to choose a date</button>
        </form>
        {error}
    <a href="/myAppointments">
        <button>My Appointments</button>
    </a>
   </>
    )
};

export default AppointmentType;