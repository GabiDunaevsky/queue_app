import { useState, useEffect } from "react"
import '../cssFiles/Home.css';
import fanLogo from '../assets/images/Logos/fanNails.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWaze,faWhatsapp,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import Hand from '../assets/images/Logos/decoration2Home.png';
import Navbar from '../components/Navbar'



function Home(){
    const [showWelcome, setShowWelcome] = useState(false);
    const [showWelcome1, setShowWelcome1] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setShowWelcome(true);
        }, 600);
    
        return () => clearTimeout(timeout);
      }, []);
      useEffect(() => {
        const timeout = setTimeout(() => {
          setShowWelcome1(true);
        }, 1600); 
    
        return () => clearTimeout(timeout);
      }, []);
      useEffect(() => {
        const handleScroll = () => {
            const nav = document.querySelector('.nav');
            if (nav) {
                if (window.scrollY > 0) {
                    nav.style.top = `${window.scrollY}px`;
                } else {
                    nav.style.top = '0';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return(
        <>
        <div className="homepage-page" id="section1">
        <Navbar className="nav"/>
        <div className="homeConrent">
            <div className="homepage-container">
                <i>
                    <p className={showWelcome ? "welcom fadeIn" : "welcom"}>Dana nails</p>
                </i>
                    <p className={showWelcome1 ? "welcom1 fadeIn" : "welcom1"}>Welcome</p>
                </div>
                <a href="/login">
                    <button className="BtnHome">להזמנת תור</button>
                </a>
            </div>
        </div>
        <div className="onBuis" id="section2">
            <div className="fanImg">
                <img src={fanLogo} alt="" style={{ width: '120%', height: '100%' }}/>
            </div>
            <div className="txt">
            <p className="headSecondSec">💕 קצת עליי</p>
                <p className="txtB">.היי, קוראים לי דנה ברודו ואני מתעסק בלק ג'ל וציפורניים כ-5 שנים
                    <br></br>
                    .כחלק מהטיפולים שאני מציעה ניתן להוסיף בנייה, מבנה אנטומי וקישוטים                   
                     <br></br>
                    .אני מקבלת לקוחות בשכונת ארנונה, השופט חיים כהן 16, דירה 111
                </p>
                <a href="/works">
                    <button className="myWorks">העבודות שלי</button>
                </a>
            </div>
        </div>
        <div className="contact" style={{ backgroundColor: 'rgb(235, 248, 250)' }} id="section3"> 
            <img src={Hand} style={{ width: '20%', height: '10%' }} alt="Hand Image" />
            <div className="contacrOps">
                <a href='https://www.instagram.com/dananailsofficial?igsh=bjBkcGxqd3I2dXY4'> 
                <FontAwesomeIcon icon={faInstagram} className="icon" />
                <span>
                    למעבר לאינסטגרם
                </span>
                </a>
                <a href='mailto:danabru5@gmail.com '>
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <span>
                    לשליחת אימייל
                    </span>
                </a>
                <a href="https://wa.me/+972509712250?text=Hello%20from%20WhatsApp!">
                    <FontAwesomeIcon icon={faWhatsapp} className="icon" />
                    <span>
                    לשליחת הודעה
                    </span>
                </a>
                <a href="https://ul.waze.com/ul?preview_venue_id=23068989.230820966.535055&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location"> 
                    <FontAwesomeIcon icon={faWaze} className='icon' />;
                    <span>
                    לניווט עם וויז
                    </span>
                </a>
                <a href='tel:0509712250'>
                <FontAwesomeIcon icon={faPhone} className='icon'/>
                <span>
                    0509712250
                </span>
                </a>
            </div>
            <div className="hoursWorkTxt">
                <p className="headHours">שעות פעילות</p>
                <p className="txtHours">יום ראשון: 
                9:00-20:00
                <br></br>
                 יום שני: 9:00-20:00
                <br></br>
                יום שלישי: 9:00-20:00
                <br></br>
                יום רביעי: 9:00-20:00
                <br></br>
                יום חמישי: 9:00-20:00
                </p>
            </div>
        </div>
        </>
    )
};

export default Home;
