import React, { useState } from 'react';
import Loader from '../../components/Loader/Loading.jsx'
import Error from '../../components/Error/Error.jsx'
import useGetProfile from '../../Hooks/useFetchData.jsx'
import { BASE_URL } from '../../config.js';
import Tabs from './Tabs.jsx';
import starIcon from '../../assets/starIcon.png'
import DoctorAbout from '../../pages/Doctors/DoctorAbout.jsx';
import ProfileDoctor from './ProfileDoctor.jsx';
import Appointment from './Appointment.jsx';
import {  LuIndianRupee } from 'react-icons/lu';
const Dashboard = () => {
  const {data,loading,error}=useGetProfile(`${BASE_URL}/doctors/profile/me`)

  const [tab,setTab]=useState('overview')
  return (
  <section>
      <div className='max-w-[1170px] px-5 mx-auto '>
     {loading && !error && <Loader/>}
     {error && !loading && <Error />}

     {!loading && !error && <div className='grid lg:grid-cols-3 gap-[30px] lg-gap-[50px]'>
        <Tabs tab={tab} setTab={setTab}/>
        <div className='lg:col-span-2'>
          {data?.isApproved=== 'pending' && (
            <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
              <span className='sr-only'>Info</span>
              <div className=''>
                To get approved  please complete your profile . We will review manually and approve  within 3 days.
              </div>
            </div>
          )}
          <div className='mt-8'>
            {tab==='overview' && 
            <div className='flex flex-col gap-4 mb-10'>
              <figure className='max-w-[200px] max-h-[200px]'>
                <img src={data?.photo} alt="#" className='w-full h-[300px]' />
              </figure>
              <div className='ms-[300px] mt-[-180px]'>
                
                <h3 className='text-[22px] leading-9 font-bold  text-headingColor mt-3'>{data.name}</h3>
                
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'><img src={starIcon} alt="" className='w-[10px] h-[10px]' />{data.averageRating}</span>
                  <span className=' text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>({data.totalRating})</span>
                  
                </div>
                
                <p className='text_para font-[15px] lg:max-w-[390px] leading-6 mb-4'>{data?.bio}</p>

                {/* <div className='flex flex-row'> */}
                  <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold '>Ticket Price </h3> 
                  <p className=' flex text-[20px] leading-6 font-medium text-headingColor  bg-[#fff9ea] ms-3 rounded-md'><LuIndianRupee className='me-3'/> {data?.ticketPrice}  onwards</p>
                  <p className='text-[16px] leading-6 font-medium text-textColor mt-5'></p>
                  <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Language Known</h3> 
                  <p className='text-[20px] leading-6 font-medium text-textColor   bg-[#fff9ea] ms-3 rounded-md'>{data?.language}</p>
                {/* </div> */}
              </div>
              
              <DoctorAbout name={data?.name} about={data?.about} qualifications={data?.qualifications} experiences={data?.experiences} professionalAffiliation={data?.professionalAffiliation} bio={data?.bio} ticketPrice={data?.ticketPrice} language={data?.language} specialization={data?.specialization}/>
              </div>}

            {tab==='appointments' && <Appointment appointments={ data?.appointments}/>}
            {tab==='settings' && <ProfileDoctor doctorData={data}/>}

          </div>
        </div>

      </div>}
    </div>
  </section>
  );
}

export default Dashboard;
