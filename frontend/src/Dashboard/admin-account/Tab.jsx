import React, {  useContext } from 'react';
import { BiMenu } from 'react-icons/bi';
import { authContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Tabs = ({tab,setTab}) => {

  const {dispatch} =useContext(authContext)
  const  navigate=useNavigate()

  const handleLogOut=()=>{
    dispatch({type:'LOGOUT'});
    navigate('/')
  }
  return (
    <div className='ms-[-150px] mt-[20px]'>
    <span className='lg:hidden'><BiMenu className='w-6 h-6 cursor-pointer'/></span>
    <div className='hidden lg:flex flex-col w-[300px] p-[30px] bg-violet-100 shadow-panelShadow items-center h-max rounded-md'>
    <button onClick={()=>setTab('overview')} className={`${tab==='overview'? 'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor' } w-full btn mt-0 rounded-md`}>Overview</button>
    <button  onClick={()=>setTab('doctor')} className={`${tab==='doctors'? 'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor' } w-full btn mt-0 rounded-md`}>Doctors</button>
    <button  onClick={()=>setTab('user')} className={`${tab==='users'? 'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor' } w-full btn mt-0 rounded-md`}>Patient</button>
    <button  onClick={()=>setTab('appointments')} className={`${tab==='settings'? 'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor' } w-full btn mt-0 rounded-md`}>Appointments</button>
    <button  onClick={()=>setTab('settings')} className={`${tab==='settings'? 'bg-indigo-100 text-primaryColor':'bg-transparent text-headingColor' } w-full btn mt-0 rounded-md`}>Settings</button>
    
         <div className='mt-[100px]  w-full'>
           <button className='w-full bg-[#181A]  p-3 leading-7 text-[16px] rounded-md text-white font-bold' onClick={handleLogOut}>Logout</button>
           <button className='w-full bg-red-600 mt-4  p-3 leading-7 text-[16px] rounded-md text-white font-bold'>Delete</button>
         </div>
    </div>

    
    </div>
  );
}

export default Tabs;
