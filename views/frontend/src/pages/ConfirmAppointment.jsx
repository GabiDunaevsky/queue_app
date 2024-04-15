import { useAppointment } from '../components/AppointmentContext';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ConfirmAppointment(props){
    const { appointmentData, setAppointmentData } = useAppointment();
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        setAppointmentDetails(appointmentData);
    }, [appointmentData]);

    const checkAuth = async ()=>{
        const res = await fetch('http://localhost:3500/confirm', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' 
        });
        if (res.ok) {
            const data = await res.json(); 
            console.log(data);
            console.log(data.error);
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
        const data = response.text();
        console.log(data)
        } catch (error) {
            console.error('Error authenticating user:', error);
        }
  };
    return(
    <>
         <>
            <i>
                <h1>😊 שלום {props.loggedInName} , אנא אשרי את פרטי התור</h1>
            </i>
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
            <br />
            <form onSubmit={handleSubmit}>
                <button>Confirm Your Details and set an appointment</button>
            </form>
        </>
    </>
    )
};

export default ConfirmAppointment;