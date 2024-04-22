import { useAppointment } from '../components/AppointmentContext';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import '../cssFiles/AppointmentConfirm.css';
import Hand from '../assets/images/Logos/decoration2Home.png';


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

    const timeFormat = (hour) =>{
        const wholeHours = Math.floor(hour);
        const minutes = (hour - wholeHours) * 60;
        const formattedHours = String(wholeHours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
        }

    const dateformat =(date) =>{
        if(date === undefined){
            return 'אירע שגיאה נא חזור להזמנת תור'

        }
        const dateParts = date.split('-');
        const day = dateParts[2];
        const month = dateParts[1];
        const year = dateParts[0];
        return day + '/' + month + '/' + year + " :" + " התאריך שנבחר";
    }
    const longTimeFormat =(longTime) =>{
        if(longTime === 1.5){
            return 'שעה וחצי';
        }else if(longTime === 2){
            return 'שעתיים';
        }else if(longTime === 2.5){
            return 'שעתיים וחצי';
        }
    }

    return(
    <>
        <Header/>
        <WelcomeMessage Type ={', אנא אשר את פרטי התור'}/>
        <div className="containerApoointmentData">
            <div>
                {appointmentDetails && ( 
                    <>
                        <p>{dateformat(appointmentDetails.date)}</p>
                        <p>{appointmentDetails.treatment}</p>
                        <p> משך זמן משוער עבור הטיפול: {longTimeFormat(appointmentDetails.treatmentLong)}</p>
                        <p>{timeFormat(appointmentDetails.startTime)} :שעת התחלה</p>
                        <p>{timeFormat(appointmentDetails.endTime)} :שעת סיום</p>
                    </>
                )}
            </div>
            {message && <p style={{color: 'red'}}>{message}</p>}
            <br />
            <form onSubmit={handleSubmit}>
                <button>אשר את הפרטים וקבע תור</button>
            </form>
            <a href='/appointmentType'>
                <button>חזרה לקביעת תור</button>
            </a>
            <div className="imageContainer">
                <img src={Hand} width='300' height='250'></img>
            </div>
        </div>
    </>
    )
};

export default ConfirmAppointment;