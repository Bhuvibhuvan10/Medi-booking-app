// import React from 'react';
// import convertTime from '../../Utilis/covertTime';
// import {BASE_URL,token} from '../../config'
// import { toast } from 'react-toastify';
// const SidePanel = ({doctorId,ticketPrice,timeSlots}) => {

//   const bookingHandler= async()=>{
//     try {
//       const res=await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
//         method:'post',
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       })

//       const data=await res.json()
//       if(!res.ok){
//         throw new Error(data.message + 'Please try again')
//       }

//       if(data.session.url){
//         window.location.href=data.session.url
//             }
//     } catch (err) {
//       toast.error(err.message)
      
//     }
//   }
//   return (
//     <div className='shadow-panelShadow p-3 lg:p-5 rounded-md '>
//       <div className='flex items-center justify-between'>
//         <p className='text_para mt-0 font-semibold'>Ticket Price</p>
//         <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
//            {ticketPrice}BDT
//         </span>
//       </div>

//       <div className='mt-[30px]'>
//         <p className='text_para mt-0 font-semibold text-headingColor'>Available Time Slot:</p>

//         <ul className='mt-3'>
//             {timeSlots?.map((item,index)=>( <li key={index} className='flex items-center justify-between mb-2'>
//                 <p className='text-[15px] leading-6 text-textColor font-semibold'>
//                    {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
//                 </p>
//                 <p className='text-[15px] leading-6 text-textColor font-semibold'>
//                    {convertTime(item.startingTime)}-{convertTime(item.endingTime)}
//                    </p>
//             </li>
//             ))}
           
//         </ul>
//       </div>
//       <button className='btn px-2 w-full rounded-md' onClick={bookingHandler}>Book Appointment</button>
//     </div>
//   );
// }

// export default SidePanel;
import React, { useState } from 'react';
import convertTime from '../../Utilis/covertTime';
import { BASE_URL, token } from '../../config';
import { toast } from 'react-toastify';

const SidePanel = ({ doctorId, ticketPrice, timeSlots = [] , appointmentDate =new Date ,appointmentTime}) => {
  const [loading, setLoading] = useState(false);

  const bookingHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          appointmentDate: appointmentDate,
          appointmentTime:appointmentTime
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`${data.message}. Please try again`);
      }

      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text_para mt-0 font-semibold'>Ticket Price</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          {ticketPrice} BDT
        </span>
      </div>

      <div className='mt-[30px]'>
        <p className='text_para mt-0 font-semibold text-headingColor'>Available Time Slot:</p>
        <ul className='mt-3'>
          {timeSlots.map((item, index) => (
            <li key={index} className='flex items-center justify-between mb-2'>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className='text-[15px] leading-6 text-textColor font-semibold'>
                [{convertTime(item.startingTime)} - {convertTime(item.endingTime)}]
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button
        className={`btn px-2 w-full rounded-md ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={bookingHandler}
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>
    </div>
  );
};

export default SidePanel;
