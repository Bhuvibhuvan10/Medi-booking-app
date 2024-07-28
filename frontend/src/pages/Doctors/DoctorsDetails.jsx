import React,{useState} from 'react';

import { IoStarSharp } from "react-icons/io5";
import DoctorAbout from './DoctorAbout'
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import {BASE_URL} from '../../config'
import useFetchData from '../../Hooks/useFetchData'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'
import { useParams } from 'react-router-dom';

const DoctorsDetails = () => {

  const {id}=useParams()
  const [tab,setTab]=useState('about')
  const {data:doctor,loading,error}=useFetchData(`${BASE_URL}/doctors/${id}`)
  const {name,qualifications,experiences,reviews,bio,about,averageRating,totalRating,specialization,ticketPrice,photo,professionalAffiliation,timeSlots}=doctor
  console.log(doctor);

  return (
   <section>
    <div className='max-w-[1170px] px-5 mx-auto'>
    {loading && <Loader/>}
    {error &&  <Error/> }
    {!loading && !error && <div className='grid md:grid-cols-3 gap-[80px]'>
      <div className='md:col-span-2'>
        <div className='flex items-center gap-5'>
          <figure className='max-w-[200px] max-h-[200px] rounded-full border-spacing-2 border-[#CCF0F3]'>
          <img className="w-[200px] h-[200px] m-auto mt-[30px] rounded-full border-primaryColor shadow-2xl" src={photo} alt="Sunset in the mountains"/>
          </figure>

          <div className='mt-[50px] ms-[20px] mx-auto'>
           
            <h3 className='text-headingColor text-[22px] leading-9 mt-[20px] font-bold mb-4'>
              {name}
            </h3>
            <span className='bg-[#CCF0F3] text-irisBlueColor overflow-scroll ms-[-20px] mt-[40px] py-6 px-6 lg:py-3 lg:px-6 text-[12px] leading-10 lg:text-[16px] lg:leading-10 font-semibold rounded'>
             {specialization}
            </span>
            <div className='flex items-center gap-[6px]'>
              
              <p className='text_para text-[14px] leading-5 md:text-[15px] lg:max-w-[390px]'>
              
              </p><br/>
              <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor mt-4">
              <IoStarSharp className='text-yellow-500'/> {averageRating}({totalRating})
              </span>
            </div>
          </div>
        </div>
        <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
          <button 
          onClick={()=>setTab('about')}
          className={`${tab==='about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}> About </button>
          <button 
           onClick={()=>setTab('feedback')}
          className={`${tab==='feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}> Feedback </button>
        </div>

        <div className='mt-[50px] '>
          {
            tab === 'about' && <DoctorAbout name={name} about={about} qualifications={qualifications} experiences={experiences} professionalAffiliation={professionalAffiliation} bio={bio} specialization={specialization} />
          }
          {
            tab === 'feedback' && <Feedback reviews={reviews} totalRating={totalRating}  />
          }
        </div>
        </div>

        <div>
          <SidePanel doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots} />
        </div>
    </div>}
    </div>
   </section>
  );
}

export default DoctorsDetails;
