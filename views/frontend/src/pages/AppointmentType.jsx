import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointment } from '../components/AppointmentContext';
import  WelcomeMessage  from '../components/WelcomeGuest';
import Header from '../components/Header';
import '../cssFiles/AppointmentType.css'
import Hand from '../assets/images/Logos/decoration2Home.png';

function AppointmentType(){
    const { appointmentData, setAppointmentData } = useAppointment();
    const navigate = useNavigate();

    useEffect(()=>{
        const checkAuth = async ()=>{
            const res = await fetch('http://localhost:3500/user/isAuth', {
                method: 'GET',
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                if (data.error === 'Not authorized') {
                    navigate('/login', { replace: true });
                }
            }
        }
        checkAuth()},[]);

    

    const handleTreatment = (e) =>{
        e.preventDefault();
        const selectedTreatment = document.querySelector('input[name="group1"]:checked');
        if (selectedTreatment) {
            const selectedValue = selectedTreatment.value;
            if (selectedValue === 'lakGel') {
                setAppointmentData({treatment: "סוג הטיפול: לק ג'ל", treatmentLong: 1.5});
              } else if (selectedValue === 'Anatom') {
                setAppointmentData({treatment: " סוג הטיפול: לק ג'ל + מניקור + מבנה אנטומי", treatmentLong: 2});
              }
              else if (selectedValue === 'milui') {
                setAppointmentData({treatment: " סוג הטיפול: מילוי בג'ל בנייה + מבנה אנטומי", treatmentLong: 2});
              }
              else if (selectedValue === 'Anatom') {
                setAppointmentData({treatment: "סוג הטיפול: בנייה בג'ל", treatmentLong: 2.5});
              }
              navigate('/appointmentDate', { replace: true });
        }else{
            const form = e.target.form;
            form.reportValidity();
            return;
        }
    }

    return(
    <>
    <Header/>
    <WelcomeMessage Type ={', בחר טיפול בבקשה'} className="msgHead"/>
    <div className="containerAppointmentType">
        <form>
            <div className='alignment'>
                <div className='alignmentlakGel'>
                    <label htmlFor="lakGel">סוג הטיפול: לק ג'ל + מניקור ללא מבנה אנטומי<br/> 
                    מחיר הטיפול: 100 ש"ח
                    <br/>
                    משך הטיפול: שעה וחצי
                </label>
                </div>
                <input id="lakGel" type="radio" value="lakGel" name="group1" required />
            </div>
            <div className='alignment'>
                <div className='alignmentAnatom'>
                    <label htmlFor="Anatom"> סוג הטיפול: לק ג'ל + מניקור + מבנה אנטמי
                        <br/>
                        מחיר הטיפול: 120 ש"ח
                        <br/>
                        משך הטיפול: שעתיים
                    </label>
                </div>
                <input id="Anatom" type="radio" value="Anatom" name="group1" required />
            </div>
            <div className='alignment'>
                <div className='alignmentmilui'>
                    <label htmlFor="milui"> סוג הטיפול: מילוי בג'ל בנייה + מבנה אנטמי
                        <br/>
                        מחיר הטיפול: 140 ש"ח
                        <br/>
                        משך הטיפול: שעתיים
                    </label>
                </div>
                <input id="milui" type="radio" value="milui" name="group1" required />
            </div>
            <div className='alignment'>
                <div className='alignmentBnia'> 
                    <label htmlFor="Bnia"> סוג הטיפול: בנייה בג'ל
                        <br/>
                        מחיר הטיפול: 220 ש"ח
                        <br/>
                        משך הטיפול: שעתיים וחצי
                    </label>
                </div>
                <input id="Bnia" type="radio" value="Bnia" name="group1" required />
            </div>
        <button type="submit" id="continueBtn" onClick={handleTreatment}>המשך לבחירת תאריך</button>
    </form>
    <a href="/myAppointments">
        <button>התורים שלי</button>
    </a>
        <div className="imageContainer">
            <img src={Hand} width='300' height='250'></img>
        </div>
    </div>
   </>
    )
};

export default AppointmentType;