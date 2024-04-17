import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../components/AppointmentContext';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AppointmentType(){
    const { appointmentData, setAppointmentData } = useAppointment();
    const navigate = useNavigate();

    useEffect(()=>{
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
        checkAuth()},[]);

    

    const handleTreatment = (e) =>{
        e.preventDefault();
        const selectedTreatment = document.querySelector('input[name="group1"]:checked');
        if (selectedTreatment) {
            const selectedValue = selectedTreatment.value;
            if (selectedValue === 'lakGel') {
                setAppointmentData({treatment: 'סוג הטיפול: לק גל', treatmentLong: 1.5});
              } else if (selectedValue === 'Anatom') {
                setAppointmentData({treatment: ' סוג הטיפול: לק גל + מניקור + מבנה אנטומי', treatmentLong: 2});
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
        <Header/>
        <WelcomeMessage Type ={', בחר טיפול בבקשה'}/>
        <form>
            <div htmlFor="lakGel">סוג הטיפול: לק ג' ל<br/> 
            מחיר הטיפול: 120 ש"ח
            <br/>
            משך הטיפול: שעה וחצי
            </div>
            <input id="lakGel" type="radio" value="lakGel" name="group1" required /><br/>
            <div htmlFor="Anatom"> סוג הטיפול: לק ג'ל + מניקור + מבנה אנטמי
                <br/>
                מחיר הטיפול: 150 ש"ח
                <br/>
                משך הטיפול: שעתיים
            </div>
            <input id="Anatom" type="radio" value="Anatom" name="group1" required /><br/>
            <button type="submit" id="continueBtn" onClick={handleTreatment}>Continue to choose a date</button>
        </form>
    <a href="/myAppointments">
        <button>My Appointments</button>
    </a>
    <Footer/>
   </>
    )
};

export default AppointmentType;