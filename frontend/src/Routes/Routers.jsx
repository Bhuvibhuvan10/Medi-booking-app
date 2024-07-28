import React from 'react';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorsDetails from '../pages/Doctors/DoctorsDetails';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import MyAccount from '../Dashboard/user-account/MyAccount.jsx';
import Dashboard from '../Dashboard/doctor-account/Dashboard.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import CheckoutSuccess from '../pages/CheckoutSuccess.jsx';
import AdminDashboard from '../Dashboard/admin-account/AdminDashboard.jsx';
// import Concern from '../pages/Concern.jsx';
const Routers = () => {
  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home/>}/>
    {/* <Route path='/concern' element={<Concern/>}/> */}
    <Route path='/doctors' element={<Doctors/>}/>
    <Route path='/doctors/:id' element={<DoctorsDetails/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/services' element={<Services/>}/>
    <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
    <Route path='/admins/profile/me' element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard/></ProtectedRoute>}/>
    {/* route for user =patient  navigate to patient or it will navigate to doctor DASHBOARD */}
    <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><MyAccount/></ProtectedRoute>}/>
    <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>}/>
    
  </Routes>

   
  )
  {/* </BrowserRouter> */}
}

export default Routers;
