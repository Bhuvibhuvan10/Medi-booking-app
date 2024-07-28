
import React from 'react';

// import {formateDate} from '../../Utilis/formateDate'

const DoctorAbout = ({name, about, qualifications, experiences,bio,professionalAffiliation,specialization}) => {
  return (
    <>
    <div className='mt-12'>
      <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold items-center gap-3 mt-5 '>About of   
          <span className='text-irisBlueColor font-bold text-[24px] leading-7 ms-3'>
        {name}</span></h3>
       
        <p className='text_para'>{about} </p>

        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold mt-4 '>Specialization</h3>
        <p className='text_para'>{specialization}</p>
        
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold mt-4 '>Bio</h3>
        <p className='text_para'>{bio}</p>
       

    <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold mt-4 '>Professional Affiliation</h3>
    <p className='text_para'>{professionalAffiliation} </p>
    </div>
    
    <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>

        <ul className='pt-4 md:p-5'>
            {
            qualifications?.map ((item,index)=>
                   <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                   <div>
                       <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>{item.startingDate} to {item.endingDate}</span>
                     
                       <p className='text-[16px] leading-6 font-medium text-textColor'>{item.degree}</p>
                   </div>
                   <p className='text-[14px] leading-5 font-medium text-textColor'>{item.university}</p>
               </li>
        )}
         </ul>
    </div>
    <div className='mt-12'>
        <h3 className='text-[20px] leading-[30px] text-headingColor  font-semibold'>
            Experience
        </h3>

        <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
            {experiences?.map((item,index)=><li key={index} className='p-4 rounded bg-[#fff9ea]'>
                <span className='text-yellowColor text-[15px] leading-6 font-semibold' >{item.startingDate} to {item.endingDate}</span>
                <p className='text-[16px] leading-6 font-medium text-textColor'>{item.position}</p>
                <p className='text-[14px] leading-5 font-medium text-textColor'>{item.hospital}</p>
            </li>)}
            
        </ul>

    </div>
    
   
    </>
  );
}

export default DoctorAbout;
