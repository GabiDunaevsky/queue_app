// import '../cssFiles/Header.css'
// export default function Header(){
//     return(
//         <nav className="nav-bar">
//         <ul>
//             <li className="right">
//                 <a href="/appointmentType">
//                     <button>
//                         חזרה להזמנת תור
//                     </button>

//                 </a>
//             </li>
//             <li className="left">
//                 <a href="/logout">
//                     <button>
//                         LogOut
//                     </button>
//                     </a>
//             </li>
//         </ul>
//     </nav>
//     )
// }
import HeartLogo from '../components/HeratLogo';
import React from 'react';
import '../cssFiles/Header.css';

const Header = () => {
    return (
        <header className="header">
            <a href="/logout">
            <button className="left-button">LogOut</button>
            </a>
            <HeartLogo/>
            <a href="/appointmentType">
                <button className="right-button">חזרה להזמנת תור</button>
            </a>
        </header>
    );
}

export default Header;
