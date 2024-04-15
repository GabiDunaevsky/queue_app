import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const passportValidation = () =>{
         if (password.length < 7 ) {
            setError('Password must be at least 7 characters long');
            return false;
        }
        if(!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)){
            setError('Password must include numbers and both lowercase and uppercase letters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const validatedPassport = await passportValidation();
        if(validatedPassport){
            try {
                const response = await fetch('http://localhost:3500/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  credentials: 'include',
                  body: JSON.stringify({
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                      password: password,
                      phoneNumber: phoneNumber
                  }),
            });
              const data = await response.json();
              console.log(data)
              console.log(data.message)
              if(data.message === 'Added successfuly'){
                navigate('/login', { replace: true });
              }else{
                setError(data.message);
              }
              } catch (error) {
                  console.error('Error authenticating user:', error);
              }
        }
  };
    return(
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First name:</label>
                <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="username">Email:</label>
                <input type="email" id="username" name="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="phonenumber">Phone Number:</label>
                <input type="tel" id="phonenumber" name="phonenumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div><br />
            <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}
export default Register;