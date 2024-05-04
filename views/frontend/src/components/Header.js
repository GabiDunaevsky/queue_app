import HeartLogo from '../components/HeratLogo';
import React from 'react';
import '../cssFiles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <a href="/logout">
            <button className="left-button">יציאה</button>
            </a>
            <HeartLogo width='23%' height='500%'/>
            <a href="/appointmentType">
                <button className="right-button">חזרה להזמנת תור</button>
            </a>
        </header>
    );
}

export default Header;
