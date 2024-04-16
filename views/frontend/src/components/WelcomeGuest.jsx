import React, { useState, useEffect } from 'react';

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
        <i>
            <h1> 😊 שלום {firstName} {props.Type} </h1>
        </i>
   </>
    )
};

export default WelcomeGuest;