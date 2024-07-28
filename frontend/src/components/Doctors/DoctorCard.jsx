import React from 'react';
import { Link } from 'react-router-dom';
import { IoStarSharp } from "react-icons/io5";
import { BASE_URL } from '../../config';

const DoctorCard = ({doctor,doctorId}) => {

  
  
  if(!doctor){
    return null
  }
  const { name, avgRating, totalRating, photo, specialization,experiences, qualifications } = doctor;
  
  const bookingHandler= async()=>{
    try {
      const res=await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
        method:'post',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })

      const data=await res.json()
      if(!res.ok){
        throw new Error(data.message + 'Please try again')
      }

      if(data.session.url){
        window.location.href=data.session.url
            }
    } catch (err) {
      toast.error(err.message)
      
    }
  }

  return (
    <div className='container mx-auto p-4'>
      <div className="grid grid-cols-1 lg:w-[100%]  lg:h-[100%] sm:grid-cols-2 md:grid-cols-2 gap-5 lg:gap-[30px] ms-[-30px] mt-[-100px] lg:mt-[55px] bg-teal-300 rounded-xl overflow-hidden">
    {/* <div class="max-w-2xl mx-auto bg-green-300 rounded-lg shadow-md overflow-hidden flex"> */}
    <img className="w-48 h-48 rounded-full mt-6 ms-2 shadow-2xl" src={photo} alt="Card Image"/>

    <div className="p-2 mt-5">
      <h2 className="text-xl font-bold font-serif text-gray-800">{name}</h2>
     
      <p className="text-gray-600 mt-4 justify-center">{specialization}</p>
      <p className="text-gray-600 mt-2">{experiences && experiences[0]?.position}</p>
      <p className="text-gray-600 mt-2 bg-yellow-100">{qualifications && qualifications[0]?.degree}</p>
     
    </div>
    <div className=' m-5 flex'>
      <p className="text-gray-600">{totalRating}</p>
      <p className="text-gray-600">{avgRating}</p>
      <p className="text-yellow-600 ms-3"><IoStarSharp/></p>
    
      </div>
      <div className=" ms-[-60px] grid grid-cols-2 gap-[10px] p-4">
      <button onClick={bookingHandler} className="text-indigo-600 hover:text-white hover:bg-primaryColor font-semibold border border-primaryColor rounded-md p-2" >Book a slot</button>
        <Link to={`/doctors/${doctor._id}`} className="text-indigo-600 font-semibold  border border-primaryColor rounded-md p-2  hover:text-white hover:bg-primaryColor" >Learn More</Link>
      </div>
  </div> 



  </div>
  // </div>













    // <div classNameName='container mx-auto p-4'>
    //   <div classNameName="max-w-sm rounded overflow-hidden shadow-lg bg-white">
    //     <div classNameName='bg-green-400 p-6'>
    //       <img classNameName="w-[150px] h-[150px] flex items-center rounded-full" src={photo} alt={`${name}`} />
    //     </div>
    //     <div classNameName="px-6 py-4 text-center">
    //       <div classNameName="font-bold text-xl mb-2">{name}</div>
    //       <p classNameName="text-gray-700 text-base">{specialization}</p>
    //     </div>
    //     <div classNameName="px-6 pt-4 pb-2 flex justify-center items-center space-x-2">
    //       <span classNameName="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{avgRating}</span>
    //       <span classNameName="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{totalRating}</span>
    //       <span classNameName="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex items-center">
    //         <IoStarSharp />
    //       </span>
    //     </div>
    //     <div classNameName="px-6 pt-4 pb-2 flex justify-center items-center space-x-2">
    //       <p classNameName="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{qualifications && qualifications[0]?.degree}</p>
    //       <p classNameName="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{experiences && experiences[0]?.hospital}
          
    //       </p>
    //       <p></p>
    //       {/* <span classNameName="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex items-center">
           
    //       </span> */}
    //     </div>
        
    //     <div classNameName="text-center mt-4 mb-4">
    //       <Link to='/doctors' classNameName='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
    //         <BsArrowRight classNameName='group-hover:text-white w-6 h-5' />
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    
  );
}

export default DoctorCard;
















// import React from 'react';
// import { Link } from 'react-router-dom';
// import {BsArrowRight} from 'react-icons/bs'
// import { IoStarSharp } from "react-icons/io5";
// const DoctorCard = ({doctors}) => {

//     const {name,avgRating,totalRating,photo,specialization}=doctors
//   return (
    

    
//     <div classNameName='container ms-[-30px] me-10'>
//     <div classNameName="max-w-sm rounded overflow-hidden shadow-lg ">
//       <div classNameName='bg-purple-400'>
//    <img classNameName="w-[150px] h-[150px] m-auto mt-[30px] rounded-full" src={photo} alt="Sunset in the mountains"/>
//    </div>
//    <div classNameName="px-6 py-4">
//     <div classNameName="font-bold text-xl mb-2 text-center">{name}</div>
//     <p classNameName="text-gray-700 text-base text-center">
//       {specialization}
//     </p>
//   </div>
//   <div classNameName="px-6 pt-4 pb-2 ms-[100px]">
//     <span classNameName="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{avgRating}</span>
//     <span classNameName="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{totalRating}</span>
//     <span classNameName="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-2"><IoStarSharp/></span>
//   </div>
//   <Link to='/doctors' classNameName='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[20px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
//  <BsArrowRight classNameName='group-hover:text-white w-6 h-5'/ >
// </Link>
// </div>
// </div>

//   );
// }

// export default DoctorCard;
