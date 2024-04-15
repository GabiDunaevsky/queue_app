import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
      const checkAuth = async ()=>{
        const res = await fetch('http://localhost:3500/auth', {
            method: 'GET',
            credentials: 'include' // This ensures that cookies are sent with the request
        });
        if(res.ok) {
          const data = await res.json();
          console.log(data);
          if(data.status === 'connected'){
            navigate('/appointmentType', { replace: true });
          }
        }
    }

    checkAuth()
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('http://localhost:3500/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password
            }),
      });
        if(response.ok) {
          const username = await response.json();
          props.updateLoggedInStatus(true);
          props.updateLoggedInName(username);
        }
        } catch (error) {
            console.error('Error authenticating user:', error);
        }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;