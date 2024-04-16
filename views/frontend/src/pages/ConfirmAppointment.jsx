import { useAppointment } from '../components/AppointmentContext';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  WelcomeMessage  from '../components/WelcomeGuest';

function ConfirmAppointment(){
    const { appointmentData, setAppointmentData } = useAppointment();
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        setAppointmentDetails(appointmentData);
    }, [appointmentData]);

    const checkAuth = async ()=>{
        const res = await fetch('http://localhost:3500/user/isAuth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        });
        if (res.ok) {
            const data = await res.json();
            if (data.error === 'Not authorized') {
                navigate('/login', { replace: true });
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:3500/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(
                appointmentData
            ),
      });
        const data = await response.text();
        setMessage(data);
        } catch (error) {
            console.error('Error authenticating user:', error);
        }
  };
    return(
    <>
        
        <WelcomeMessage Type ={', אנא אשר את פרטי התור'}/>
        <div>
            {appointmentDetails && ( 
                <>
                    <p>Date: {appointmentDetails.date}</p>
                    <p>Treatment: {appointmentDetails.treatment}</p>
                    <p>Treatment Long: {appointmentDetails.treatmentLong}</p>
                    <p>Start Time: {appointmentDetails.startTime}</p>
                    <p>End Time: {appointmentDetails.endTime}</p>
                </>
            )}
        </div>
        {message && <p style={{color: 'red'}}>{message}</p>}
        <br />
        <form onSubmit={handleSubmit}>
            <button>Confirm Your Details and set an appointment</button>
        </form>
        <a href='/appointmentType'>
            <button>חזרה לקביעת תור</button>
        </a>
        
    </>
    )
};

export default ConfirmAppointment;