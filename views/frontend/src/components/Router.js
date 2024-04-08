import Header from './Header';
import Footer from './Footer';
// import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import Register from '../pages/Register';
import Home from '../pages/Home';
import AppointmentDate from '../pages/AppointmentDate';
import {createBrowserRouter, RouterProvider,Outlet} from 'react-router-dom';


export default function Router(){
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
                    path: "/register",
                    element: <Register />   
                },
                {
                    path: "/appointmentDate",
                    element: <AppointmentDate />   
                }
            ]
        }
    ])

    return(
        <RouterProvider router={BrowserRoutes} />
    )
}