import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../cssFiles/Register.css'
import HeartLogo from '../components/HeratLogo';
import BackHome from '../components/BackToHome';

function Register(){
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const[visible,setVisible] = useState(false);

    const passportValidation = () =>{
         if (password.length < 7 ) {
            setError('הסיסמא חייבת להיות באורך 7 לפחות');
            return false;
        }
        if(!/\d/.test(password) || !/[a-z]/.test(password) || !/[A-Z]/.test(password)){
            setError('הסיסמא חייבת לכלות מספרים, אותיות גדולות ואותיות קטנות');
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

        <div className="registerPage" style={{ backgroundColor: 'rgb(239, 222, 205)'}}>
            <div className="registerContainer">
                <HeartLogo className='logo'/>
                <form onSubmit={handleSubmit} className='register'>
                    <div className='registerInputs'>
                        <input type="text" id="firstName" name="firstName" placeholder='שם פרטי' value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className='registerInputs'>
                        <input type="text" id="lastName" name="lastName" placeholder='שם משפחה' value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className='registerInputs'>
                        <input type="email" id="username" name="username" placeholder='דוא"ל' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='registerInputs'> 
                        <div className='toSeeReg' onClick={()=> setVisible(!visible)}>
                            <i className={visible?  'fa-regular fa-eye' : 'fa-solid fa-eye-slash'}/>
                        </div>
                        <input type={visible? "text" : "password"} id="password" name="password" placeholder='סיסמא' className='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='registerInputs'>
                        <input type="tel" id="phonenumber" name="phonenumber" placeholder='מספר פלאפון' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div><br />
                    <button type="submit">הרשמה</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <br></br>
                <BackHome/>
            </div>
        </div>
    )
}
export default Register;