import React from 'react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
import { IoStarSharp } from 'react-icons/io5';
import './HomeSwiperDoctor.css'; // Create this CSS file to style the buttons

const HomeSwiperDoctor = ({ doctors }) => {
    if (!doctors || doctors.length === 0) {
        return null;
    }

    return (
        <div className='container-fluid ms-[-350px] mt-36 w-96'>
            <div className='w-[1228px] h-96'>
                <Swiper
                    modules={[Pagination, Navigation]} // Include Navigation module
                    spaceBetween={30}
                    slidesPerView={3}
                    pagination={{ clickable: true }}
                    navigation={{
                        nextEl: '.custom-next',
                        prevEl: '.custom-prev',
                    }} // Link custom navigation buttons
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {doctors.map((doctor, index) => (
                        <SwiperSlide key={index}>
                            <div className='py-[30px] px-5 rounded-3'>
                                <div className='flex items-center gap-[13px]'>
                                    <img src={doctor.photo} alt="" className='w-[100px]' />
                                    <div className='w-[800px]'>
                                        <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>{doctor.name}</h4>
                                        <div className='flex items-center gap-[2px]'>
                                            <p className="text-gray-600">{doctor.totalRating}</p>
                                            <p className="text-gray-600">{doctor.avgRating}</p>
                                            <p className="text-yellow-600 ms-3"><IoStarSharp /></p>
                                            <p className="text-yellow-600 ms-3">{doctor.specialization}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="custom-next">Next</div>
                    <div className="custom-prev">Prev</div>
                </Swiper>
                
            </div>
        </div>
    );
};

export default HomeSwiperDoctor;






// import React from 'react';
// import { Pagination,Navigation } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'; 
// import { IoStarSharp } from 'react-icons/io5';

// const HomeSwiperDoctor = ({ doctors }) => {
//     if (!doctors || doctors.length === 0) {
//         return null;
//     }

//     return (
//         <div className='container ms-[-250px] mt-36'>
//         <div className=' w-[1000px] h-96 '>
//             <Swiper
//                 modules={[Pagination, Navigation]} // Include Navigation module
//                 spaceBetween={30}
//                 slidesPerView={3}
//                 pagination={{ clickable: true }}
//                 navigation={{ clickable: true }} // Enable navigation
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 1,
//                         spaceBetween: 30,
//                     },
//                     768: {
//                         slidesPerView: 2,
//                         spaceBetween: 20,
//                     },
//                     1024: {
//                         slidesPerView: 3,
//                         spaceBetween: 30,
//                     },
//                 }}
//             >
//                 {doctors.map((doctor, index) => (
//                     <SwiperSlide key={index}>
//                         <div className=' py-[30px] px-5 rounded-3 '>
//                             <div className='flex items-center gap-[13px] '>
//                                 <img src={doctor.photo} alt="" className='w-[100px]' />
//                                 <div className='w-[800px]'>
//                                     <h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>{doctor.name}</h4>
//                                     <div className='flex items-center gap-[2px]'>
//                                         <p className="text-gray-600">{doctor.totalRating}</p>
//                                         <p className="text-gray-600">{doctor.avgRating}</p>
//                                         <p className="text-yellow-600 ms-3"><IoStarSharp /></p>
//                                         <p className="text-yellow-600 ms-3">{doctor.specialization}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//         </div>
//     );
// };

// export default HomeSwiperDoctor;










// import React from 'react';
// import {Pagination} from 'swiper/modules';
// import {Swiper,SwiperSlide} from 'swiper/react'
// import 'swiper/css'
// import 'swiper/css/pagination'
// import {IoStarSharp} from 'react-icons/io5'



// const HomeSwiperDoctor = ({doctor}) => {
//     if(!doctor){
//         return null
//       }
//       const { name, avgRating, totalRating, photo ,specialization} = doctor;
//   return (
//     <div className='mt-[30px] lg:mt-[55px]'>
//         <Swiper modules={[Pagination]} spaceBetween={30} slidesPerView={3} pagination={{clickable:true}}
//          breakpoints={{
//             // 640:{
//             //     slidesPreView:1,
//             //     spaceBetween:0,
//             // },
//             // 768:{
//             //     slidesPreView:2,
//             //     spaceBetween:20,
//             // },
//             1024:{
//                 slidesPreView:3,
//                 spaceBetween:30,
//             },
//         }}
//         >
//             <SwiperSlide>
//                 <div className='py-[30px] px-5 rounded-3 '>
//                     <div className='flex items-center gap-[13px]'>
//                         <img src={photo} alt="" className='w-[50px]' />
//                         <div><h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>{name}</h4>
//                         <div className='flex items-center gap-[2px]'>
//                         <p className="text-gray-600">{totalRating}</p>
//                         <p className="text-gray-600">{avgRating}</p>
//                         <p className="text-yellow-600 ms-3"><IoStarSharp/></p>
//                         <p className="text-yellow-600 ms-3">{specialization}</p>
                    
//                         </div>
//                         </div>
//                     </div>
                  
//                 </div>
//             </SwiperSlide>
// {/*           
//             <SwiperSlide>
//                 <div className='py-[30px] px-5 rounded-3 '>
//                     <div className='flex items-center gap-[13px]'>
//                         <img src={photo} alt="" className='w-[50px]' />
//                         <div><h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>{name}</h4>
//                         <div className='flex items-center gap-[2px]'>
//                         <p className="text-gray-600">{totalRating}</p>
//                         <p className="text-gray-600">{avgRating}</p>
//                         <p className="text-yellow-600 ms-3"><IoStarSharp/></p>
//                         <p className="text-yellow-600 ms-3">{specialization}</p>
                    
//                         </div>
//                         </div>
//                     </div>
                  
//                 </div>
//             </SwiperSlide>
          
//             <SwiperSlide>
//                 <div className='py-[30px] px-5 rounded-3 '>
//                     <div className='flex items-center gap-[13px]'>
//                         <img src={photo} alt="" className='w-[50px]' />
//                         <div><h4 className='text-[18px] leading-[30px] font-semibold text-headingColor'>{name}</h4>
//                         <div className='flex items-center gap-[2px]'>
//                         <p className="text-gray-600">{totalRating}</p>
//                         <p className="text-gray-600">{avgRating}</p>
//                         <p className="text-yellow-600 ms-3"><IoStarSharp/></p>
//                         <p className="text-yellow-600 ms-3">{specialization}</p>
                    
//                         </div>
//                         </div>
//                     </div>
                  
//                 </div>
//             </SwiperSlide> */}
          
         
//         </Swiper>
      
//     </div>
//   );
// }

// export default HomeSwiperDoctor;
