import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartLogo from '../components/HeratLogo';
import '../cssFiles/Login.css';

function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
      const checkAuth = async ()=>{
        const res = await fetch('http://localhost:3500/auth', {
            method: 'GET',
            credentials: 'include'
        });
        if(res.ok) {
          const data = await res.json();
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
        const message = await response.json();
        if(response.ok) {
          props.updateLoggedInStatus(true);
        }else{
          setErrorMessage(message.message);
        }
        } catch (error) {
            console.error('Error authenticating user:', error);
        }
  };

  return (
      <div className='login-page' style={{ backgroundColor: 'rgb(239, 222, 205)' }}>
        <div className='login-div'>
        <HeartLogo className='logo'/>
          <form className='login' onSubmit={handleSubmit}>
            <div>
              <input type="text" id="username" className='LoginInputs' placeholder='Email' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <input type="password" id="password" className='LoginInputs'placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className='signinB' type="submit">LOGIN</button>
          </form>
          <a href='/register'>Sign-up</a>
        </div>
      </div>    
  );
};

export default Login;