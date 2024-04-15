import Header from './Header';
import Footer from './Footer';
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
import {createBrowserRouter, RouterProvider,Outlet, Navigate} from 'react-router-dom';
import { AppointmentProvider } from './AppointmentContext';
import React, { useState } from 'react';


export default function Router(){
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedInName, setLoggedInName] = useState('');
    const updateLoggedInStatus = (status) => {
        setLoggedIn(status);
    };
    const updateLoggedInName = (name) => {
        setLoggedInName(name);
    };
    const LayOut = () =>{
        return(
          <>
            <Header/>
            <Outlet/>
            <Footer/>
          </>
        )
      }

    // const BrowserRoutes =  () =>{

    //     return(
    //         <BrowserRouter>
    //         <Routes>
    //             <Route path='/' element={<LayOut />}>
    //                 <Route path='/' element={<Home />}/>
    //                 <Route path='/contact-us' element={<Contact />}/>
    //                 </Route>
    //             </Routes>
    //         </BrowserRouter>
    //     )
    // }
    const BrowserRoutes = createBrowserRouter([
        {
            path:"/",
            element: <LayOut />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: "/appointmentDate",
                    element:(
                            <AppointmentProvider>
                                 <AppointmentDate loggedInName={loggedInName} /> 
                             </AppointmentProvider>
                            )  
                },
                {
                    path: "/appointmentTime",
                    element:(
                        <AppointmentProvider>
                             <AppointmentTime loggedInName={loggedInName} /> 
                         </AppointmentProvider>
                        )    
                },
                {
                    path: "/appointmentType",
                    element:(
                        <AppointmentProvider>
                             <AppointmentType loggedInName={loggedInName} /> 
                         </AppointmentProvider>
                        )   
                },
                {
                    path: "/confirmDetails",
                    element:(
                        <AppointmentProvider>
                             <ConfirmAppointment loggedInName={loggedInName} /> 
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
                }
            ]
        },
        {
            path: "/logout",
            // element: loggedIn ? <LogOut loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus} />: <Navigate replace to='/'/> 
            element: <LogOut loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus}/>
        },
        {
            path: "/register",
            element: <Register />   
        },
        {
            path: "/login",
            element:  loggedIn ?<Navigate replace to='/appointmentType' />: <Login loggedIn={loggedIn} updateLoggedInStatus={updateLoggedInStatus} 
            loggedInName={loggedInName} updateLoggedInName={updateLoggedInName}/>
        }
    ])

    return(
        <RouterProvider router={BrowserRoutes} />
    )
}