import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import '../cssFiles/MyAppointments.css';
import Hand from '../assets/images/Logos/decoration2Home.png';

function MyAppointments(){
    const [ appointments, setAppointments ] = useState([]);
    const [ error, setError ] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  async() =>{
        try {
            const response = await fetch(`http://localhost:3500/myQueues`, {
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
                }else if (data.error === 'Internal server error'){
                    setError('Error, please try again!');
                }else {
                    setAppointments(data);
                }
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
        }        
    }

    const handleDelete = async (queueId) => {
        try {
            const response = await fetch(`http://localhost:3500/myQueues`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({queueId})
            });
            const data = await response.json();
            if (response.ok) {
                fetchData();
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error deleting queue:', error);
        }
    };
    return(
    <>
        <Header/>
        <WelcomeMessage Type ={', רשימת התורים העתדיים'}/>
        <div className="myAppointmentsContainer">
            {appointments && appointments.length > 0 ? (
            <ul>
            {appointments.map(queue => (
                <li key={queue.id}>
                <form onSubmit={(e) => { e.preventDefault(); handleDelete(queue.id); }}>
                    <button type="submit">בטלי</button>
                </form>
                {queue.startTime} - {queue.date} 
                </li>
                ))}
                </ul>
            ) : (
                <p>אין תורים עתדיים</p>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="imageContainer">
                <img src={Hand} width='300' height='250'></img>
            </div>
        </div>
    </>
    )
};

export default MyAppointments;