import { useState, useEffect } from "react"
import axios from "axios"


function Home(){

    const [data, setData] = useState('')

    useEffect(() => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    },[])


    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:3500/')
        .then(res => {
            if (processing) {
                setData(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    return(
    <>
        <i>
            <h1>Dana nails</h1>
        </i>
        <p>This is homepage.</p>
        <p>server massege: {data}</p>
        <a href="/login">
            <button>להזמנת תור</button>
        </a>
    </>
    )
};

export default Home;