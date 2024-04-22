import { useAppointment } from '../components/AppointmentContext';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import '../cssFiles/AppointmentTime.css'
import Hand from '../assets/images/Logos/decoration2Home.png';

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

    const timeFormat = (hour) =>{
        const wholeHours = Math.floor(hour);
        const minutes = (hour - wholeHours) * 60;
        const formattedHours = String(wholeHours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
        return `${formattedHours}:${formattedMinutes}`;
    }
    return(
        <>
        <Header/>
        <WelcomeMessage Type ={', בחר את שעת הטיפול'}/>
        <div className="houresContainer">
            {hours && hours.length > 0 ? (
                 <form>
                 {hours.map((hour, index) => (
                     <div key={index}>
                         <label htmlFor={`hour${index}`}>{timeFormat(hour)}</label>
                         <input type="radio" id={`hour${index}`} name="appointmentTime" value={hour} required/>
                     </div>
                        ))}
                        <button type='submit' onClick={handleDetails}>המשך לאישור התור</button>
                ,</form>
            ) : (
                <p>🙁אין תורים זמינים</p>

            )}
            <div className="imageContainerTime">
                <img src={Hand} width='480' height='384'></img>
            </div>
        </div>
        </>
    )
}
export default AppointmentTime;