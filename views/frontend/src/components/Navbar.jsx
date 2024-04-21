import React,{useState} from "react";
import '../cssFiles/Navbar.css';

function Navbar(){
    const[click,setClick] = useState(false);

    return(
        <>
            <nav className="navbar">
                <div className="menu-icon" onClick={() => setClick(!click)}>
                    <i className={click? 'fas fa-times' : 'fas fa-bars'}/>
                 </div>
                <ul className={click? 'nav-menu active' : 'nav_menu' }>
                    <li className="nav-item">
                        <a href="#section1" onClick={() => setClick(false)} className='nav-links' style={{ paddingTop: click ? "50px" : "0" }}>הזמן תור</a>
                    </li>
                    <li className="nav-item">
                        <a href="#section2" onClick={() => setClick(false)} className='nav-links' style={{ paddingTop: click ? "50px" : "0" }}>💕קצת עליי</a>
                    </li>
                    <li className="nav-item">
                        <a href="#section3" onClick={() => setClick(false)} className='nav-links' style={{ paddingTop: click ? "50px" : "0" }}> פרטים ודרכי התקשרות</a>
                    </li>
                </ul>
            </nav>
        </>

    )
}
export default Navbar;
