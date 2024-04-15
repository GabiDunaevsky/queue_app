import { useAppointment } from '../components/AppointmentContext';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MyAppointments(props){
    const { appointmentData, setAppointmentData } = useAppointment();
    const [ appointments, setAppointments ] = useState([]);
    const [ error, setError ] = useState([]);
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
                // Refresh appointments after deletion
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
        <i>
            <h1> :שלום {props.loggedInName} , רשימת התורים העתדיים</h1>
        </i>
        {appointments && appointments.length > 0 ? (
        <ul>
          {appointments.map(queue => (
            <li key={queue.id}>
              {queue.date} - {queue.startTime}
              <form onSubmit={(e) => { e.preventDefault(); handleDelete(queue.id); }}>
                <button type="submit">Delete</button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p>No future queues</p>
      )}
        <a href='/appointmentType'>
            <button>חזור לקביעת תור</button>

        </a>
    </>
    )
};

export default MyAppointments;