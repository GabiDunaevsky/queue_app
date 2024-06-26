import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../components/AppointmentContext';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import '../cssFiles/AppointmentDate.css';
import Hand from '../assets/images/Logos/decoration2Home.png';


function AppointmentDate(){
    const { appointmentData, setAppointmentData } = useAppointment();
    const[appointmentDetails, setAppointmentDetails] = useState('לא נבחר סוג טיפול');
    const navigate = useNavigate();

    useEffect(() => {
        const checkDate = (event) => {
            const selectedDate = event.target.value;
            const today = new Date().setHours(0, 0, 0, 0);
            const selectedDateTime = new Date(selectedDate).setHours(0, 0, 0, 0);
            setAppointmentData({...appointmentData, date: selectedDate});
            if (selectedDateTime < today) {
                alert("Please select a date from today or in the future.");
                event.target.value = ''; 
            } else {
                const dateParts = selectedDate.split('-');
                const day = dateParts[2];
                const month = dateParts[1];
                const year = dateParts[0];
                document.getElementById('selectedDateDis').innerText =  day + '/' + month + '/' + year + " :" + " התאריך שנבחר";
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
      if (dayOfWeek === 5 || dayOfWeek === 6) { 
          event.target.value = ''; 
          alert("Please select a date from Sunday to Thursday.");
      }
  }
  const checkAuth = async ()=>{
    const res = await fetch('http://localhost:3500/user/isAuth', {
        method: 'GET',
        credentials: 'include'
    });
    if (res.ok) {
        const data = await res.json();
        if (data.error === 'Not authorized') {
            navigate('/login', { replace: true });
        }
    }
  }
    const handleAppointment = (e) =>{
        e.preventDefault();
        if(document.getElementById('datepicker').value){
            navigate("/appointmentTime", { replace: true });
        }else{
            const form = e.target.form;
            form.reportValidity();
            return;
        }  
    }
    return(
    <>
        <Header/>
        <WelcomeMessage Type ={', בחרי תאריך עבור הטיפול'}/>
        <div className="pickContainer">
            <form>
            <div>
                <input type="date" id="datepicker" name="datepicker" required onInput={(event) => checkDayOfWeek(event)}/>
            </div>
            <label >
                {appointmentDetails}<br/>
            </label>
            <label id="selectedDateDis"></label><br/><br/>
            <button type="submit" onClick={handleAppointment}>המשיכי לבחירת שעה</button>
        </form>
        <div className="imageContainer">
            <img src={Hand} style={{ width: '65%', height: '30%' }} class="responsive-image"></img>
        </div>

        </div>
    </>
    )
};

export default AppointmentDate;