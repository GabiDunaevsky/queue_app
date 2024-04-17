import { useAppointment } from '../components/AppointmentContext';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AppointmentTime(){
    const navigate = useNavigate();
    const {appointmentData, setAppointmentData } = useAppointment();
    const[hours,setHours] = useState([]);
    const queryParams = new URLSearchParams(appointmentData).toString();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  async() =>{
        try {
            const response = await fetch(`http://localhost:3500/queueHour?${queryParams}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok) {
                if (data.error === 'Not authorized') {
                    navigate('/login', { replace: true });
                }else {
                    setHours(data);
                }
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
        }        
    }


    const handleDetails = (e) =>{
        e.preventDefault();
        const selectedTime = document.querySelector('input[name="appointmentTime"]:checked');
        if (selectedTime) {
            const selectedValue = Number(selectedTime.value);
            setAppointmentData({...appointmentData, startTime: selectedValue , endTime:selectedValue + Number(appointmentData.treatmentLong)});
            navigate('/confirmDetails', { replace: true });
        }else{
            const form = e.target.form;
            form.reportValidity();
            return;
        }
    }
    return(
        <>
        <Header/>
        <WelcomeMessage Type ={', בחר את שעת הטיפול'}/>
        <form>
                {hours.map((hour, index) => (
                    <div key={index}>
                        <input type="radio" id={`hour${index}`} name="appointmentTime" value={hour} required/>
                        <label htmlFor={`hour${index}`}>{hour}</label>
                    </div>
                ))}
                <button type='submit' onClick={handleDetails}>Continue to Confirm</button>
            </form>
            <Footer/>
        </>
    )
}
export default AppointmentTime;