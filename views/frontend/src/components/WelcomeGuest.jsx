import React, { useState, useEffect } from 'react';
import '../cssFiles/WelcomeGuest.css'

function WelcomeGuest(props){
    const[firstName,setFirstName] = useState('');
    useEffect(()=>{
        const checkAuth = async ()=>{
            const res = await fetch('http://localhost:3500/user/firstName', {
                method: 'GET',
                credentials: 'include' 
            });
            if (res.ok) {
                const data = await res.text(); 
                setFirstName(data);
            }
        }
        checkAuth()},[]);
    return(
    <>
    <div className="welcomHead">
        <p> 😊 שלום {firstName} {props.Type} </p>
    </div>
   </>
    )
};

export default WelcomeGuest;