import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogOut(props){
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =  async() =>{
        try {
            const response = await fetch(`http://localhost:3500/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error authenticating user:', error);
        }      
    }
    return (<a href='/'></a>);
};

export default LogOut;