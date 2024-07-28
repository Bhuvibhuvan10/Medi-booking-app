import React, { useContext, useState } from 'react';
import userImg from '../../assets/doc-logo.png'
import {authContext} from '../../context/AuthContext.jsx'
import MyBooking from './MyBooking.jsx';
import Profile from './Profile.jsx';
import useGetProfile from '../../Hooks/useFetchData.jsx'
import { BASE_URL } from '../../config.js';
import Loading from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx'
import AppointmentDetails from './AppointmentDetails.jsx';

const MyAccount = () => {
// destructuring dispatch method from authContext
  const {dispatch}= useContext(authContext)

  const [tab,setTab] =useState('bookings')
  const{data:userData,loading,error}=useGetProfile(`${BASE_URL}/users/profile/me`)

  console.log(userData,'userdata')
  const handleLogOut=()=>{
    dispatch({type:'LOGOUT'})
  }

  return (
   <section>
     <div className='max-w-[1170px] px-5 mx-auto'>

      {loading && !error && <Loading/>}

      {error &&  !loading && <Error errMessage={error}/>}

     {!loading && !error && (
       <div className='grid md:grid-cols-3 gap-10'>
       <div className='pb-[50px] px-[30px] rounded-md'>
         <div className='flex items-center justify-center'>
           <figure className='h-[100px] w-[100px] rounded-full border-[2px] border-primaryColor'>
             <img src={userData.photo} alt="" className='w-full h-full rounded-full'/>
           </figure>
         </div>
         <div className='text-center mt-4'>
           <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{userData.name}</h3>
           <p className='text-[15px] leading-6  font-medium text-textColor'>{userData.email}</p>
           <p className='text-[15px] leading-6  font-medium text-textColor'><span className='ml-2 text-headingColor text-[16px] leading-8'>Age</span>  {userData.age}</p>
           <p className='text-[15px] leading-6  font-medium text-textColor'><span className='ml-2 text-headingColor text-[16px] leading-8'>Marital Status</span> {userData.maritalStatus}</p>
         </div>

         <div className='mt-[50px] md:mt-[100px]'>
           <button className='w-full bg-[#181A]  p-3 leading-7 text-[16px] rounded-md text-white font-bold ' onClick={handleLogOut}>Logout</button>
           <button className='w-full bg-red-600 mt-4  p-3 leading-7 text-[16px] rounded-md text-white font-bold'>Delete</button>
         </div>
       </div>
       <div className='md:col-span-2 md:px-[30px]'>
         <div>
           <button onClick={()=>setTab('bookings')} className={`${ tab==='bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-md text-headingColor font-semibold  text-[16px] leading-7 border border-solid border-primaryColor`}>New Booking</button>
           <button onClick={()=>setTab('settings')} className={`${ tab==='settings' && 'bg-primaryColor text-white font-normal'} py-2 px-5 rounded-md text-headingColor font-semibold  text-[16px] leading-7 border border-solid border-primaryColor`}>Profile Setting</button>
           <button onClick={()=>setTab('appointmentdetail')} className={`${ tab==='appointmentdetail' && 'bg-primaryColor text-white font-normal'} py-2 ms-5 px-5 rounded-md text-headingColor font-semibold  text-[16px] leading-7 border border-solid border-primaryColor`}>Appointment Details</button>
         </div>

           {
             tab==='bookings' && <MyBooking/>
           }
           {
             tab=='settings' && <Profile user={userData}/>
           }
           {
             tab=='appointmentdetail' && < AppointmentDetails user={userData}/>
           }

       </div>
     </div>
     )}
    </div>
   </section>
  );
}

export default MyAccount;
