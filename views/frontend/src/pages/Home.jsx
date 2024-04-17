import { useState, useEffect } from "react"
// import axios from "axios"
import '../cssFiles/Home.css';
// import backgroundImage from '../assets/images/backGrounds/homeBackground.png';



function Home(){

    // const [data, setData] = useState('')

    // useEffect(() => {
    //     let processing = true
    //     axiosFetchData(processing)
    //     return () => {
    //         processing = false
    //     }
    // },[])


    // const axiosFetchData = async(processing) => {
    //     await axios.get('http://localhost:3500/')
    //     .then(res => {
    //         if (processing) {
    //             setData(res.data)
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }

    return(
        <div className="homepage-page">
            <div className="homepage-container">
            <i>
                <h1 className="welcom">Dana nails</h1>
            </i>
                <p>ברוכים הבאים</p>
            </div>
            <a href="/login">
                    <button>להזמנת תור</button>
            </a>
        </div>
    )
};

export default Home;
