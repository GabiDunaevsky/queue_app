// import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Register from '../pages/Register';
import Home from '../pages/Home';
import AppointmentDate from '../pages/AppointmentDate';
import AppointmentTime from '../pages/AppointmentTime';
import AppointmentType from '../pages/AppointmentType';
import ConfirmAppointment from '../pages/ConfirmAppointment';
import Login from '../pages/LogIn';
import LogOut from '../pages/LogOut';
import MyAppointments from '../pages/MyAppointments';
import MyWorks from '../pages/Works';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import { AppointmentProvider } from './AppointmentContext';
import React, { useState } from 'react';


export default function Router(){
    const [loggedIn, setLoggedIn] = useState(false);
    const updateLoggedInStatus = (status) => {
        setLoggedIn(status);
    };
    const BrowserRoutes = createBrowserRouter([
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/appointmentDate",
            element:(
                    <AppointmentProvider>
                         <AppointmentDate /> 
                     </AppointmentProvider>
                    )  
        },
        {
            path: "/appointmentTime",
            element:(
                <AppointmentProvider>
                     <AppointmentTime /> 
                 </AppointmentProvider>
                )    
        },
        {
            path: "/appointmentType",
            element:(
                <AppointmentProvider>
                     <AppointmentType /> 
                 </AppointmentProvider>
                )   
        },
        {
            path: "/confirmDetails",
            element:(
                <AppointmentProvider>
                     <ConfirmAppointment /> 
                 </AppointmentProvider>
                )   
        },
        {
            path: "/myAppointments",
            element:(
                <AppointmentProvider>
                     <MyAppointments /> 
                 </AppointmentProvider>
                )   
        },
        {
            path: "/works",
            element: <MyWorks />   
        },
        {
            path: "/logout",
            element: <LogOut loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus}/>
        },
        {
            path: "/register",
            element: <Register />   
        },
        {
            path: "/login",
            element:  loggedIn ?<Navigate replace to='/appointmentType' />: <Login loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus} />
        }
    ])

    return(
        <RouterProvider router={BrowserRoutes} />
    )
}