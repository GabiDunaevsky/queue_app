import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartLogo from '../components/HeratLogo';
import '../cssFiles/Login.css';
import BackHome from '../components/BackToHome';

function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const[visible,setVisible] = useState(false);
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
        const responseBody = await response.text();
        const message = responseBody ? JSON.parse(responseBody) : null;
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
      <div className='login-page'>
        <div className='login-div'>
        <HeartLogo className='logo' width='80%' height='40%'/>
          <form className='login' onSubmit={handleSubmit}>
            <div className='LoginInputs'>
              <input type="text" id="username"  placeholder='דוא"ל' value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className='LoginInputs'>
              <div className='toSee' onClick={()=> setVisible(!visible)}>
                  <i className={visible?  'fa-regular fa-eye' : 'fa-solid fa-eye-slash'}/>
              </div>
              <input type={visible? "text" : "password"} id="password" placeholder='סיסמא' className='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button className='signinB' type="submit">כניסה</button>
          </form>
          <a href='/register'>עוד לא נרשמת? לחצי כאן</a>
          <br></br>
          <BackHome/>
        </div>
      </div>    
  );
};

export default Login;