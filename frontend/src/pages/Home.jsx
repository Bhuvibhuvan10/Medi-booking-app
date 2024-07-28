import React from 'react';
import video from '../assets/video.mp4'
import findadoctor from '../assets/findadoctor.png'
import findalocation from '../assets/findalocation.png'
import bookappointment from '../assets/bookappointment.webp'
import { Link } from 'react-router-dom';
import About from '../components/About/About';
import {BsArrowRight} from 'react-icons/bs'
import ServiceList  from '../components/Services/ServiceList'
import featureImg from  '../assets/images3.jpeg'
import videoIcon from '../assets/vector-video-camera-icon.jpg'
import avatarIcon from '../assets/avatarIcon.jpg'
// import DoctorList from '../components/Doctors/DoctorList.jsx';
import HomeGreatDoctorList from '../components/Doctors/HomeGreatDoctorList';
import faqImg from '../assets/faqImg.webp'
import FaqList from '../components/Faq/FaqList';
import Testimonial from '../components/Testimonial/Testimonial';


const Home = () => {
  return (
    <>
      {/* ===========================  hero section ======================== */}
      
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className='container'>
          <div className="flex flex-col lg:flex-row gap-[90px]  items-center justify-between ">


      {/*=========================  hero content ==============================*/}
            <div className='lg:w-[570px]'>
              <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]'>
                Mental Wellness Support right at your finger tips
              </h1>
              <p className='text_para'>Whatever be your situation we are there to support you and help you.
              Regardless of your age, our professional counsellors are here to help you achieve a healthier state of mind.
              Our psychotherapy sessions cater to rehabilitation and treatment of mental disorders such as depression, anxiety, stress, and anger.<br/>
              🧠  Book a counselling appointment now to improve your mental wellness!!!
              </p>
              <button className='btn sm:ms-[200px]'>Request an Appointment</button>
            </div> 




      {/*============================= hero videos ========================== */}
    

          <div className=" flex justify-end items-center  mt-[80px] lg:mt-[20px]   lg:flex-row lg:items-center gap-5  lg:gap-[30px] w-[600px] h-[100px] ">
              <div className="max-w-7xl bg-white rounded-lg shadow-lg p-6 w-full  mx-4 sm:max-w-sm  sm:ms-[-200px] sm:w-[300px] sm:h-[200px] lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 sm:mt-4">
                 
                    <div className="relative" style={{paddingTop: '56.25%'}}>
                    <iframe
                      className="absolute top-[-100%] left-[-100%] w-[600px] h-[600px] hidden md:block  "
                      src={video}
                      title="Video"
                      allowFullScreen
                    ></iframe>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/*============================ hero section end  ==================================*/}

         <section>
            <div className='container'>
              <div className='lg:w-[470px] mx-auto'>
               <h2 className='heading text-center'>Providing the best Medical Service</h2>
              <p className='text_para text-center'>
                World class care for everyone. One health System offer unmatched,
                expert health care
              </p>
              </div>

               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap[30px] mt-[30px] lg:mt-[55px]'>

              <div className='py-[30px] px-5 '>

              <div className='flex items-center justify-center' >
                <img src={findadoctor} alt=''/>
                </div>

               <div className='mt-[30px]'>

                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Doctor</h2>

                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> World class care for everyone. One health System offer unmatched,
                expert health care. From the lab to the clinic.</p> 

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5'/ >
                </Link>
          
              </div> 


             </div>
              <div className='py-[30px] px-5'>

              <div className='flex items-center justify-center' >
                <img src={findalocation} alt=''/>
                </div>

               <div className='mt-[30px]'>

                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Find a Location</h2>

                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> World class care for everyone. One health System offer unmatched,
                expert health care. From the lab to the clinic.</p> 

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5'/ >
                </Link>
          
              </div> 


             </div>
              <div className='py-[30px] px-5'>

              <div className='flex items-center justify-center' >
                <img src={bookappointment} alt=''/>
                </div>

               <div className='mt-[30px]'>

                <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>Book Appointment</h2>

                <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'> World class care for everyone. One health System offer unmatched,
                expert health care. From the lab to the clinic.</p> 

                <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                  <BsArrowRight className='group-hover:text-white w-6 h-5'/ >
                </Link>
          
              </div> 


             </div>
              
            
          </div>
        </div>

      </section>

      {/*=======================================   About us start    ===================================== */}

      <About />

      {/* =======================================  Services section ===================================== */}

      <section>
        <div className="container">
          <div className='xl:w-[470px] mx-auto' >
            <h2 className='heading text-center'>Our Medical Services</h2>
            <p className='text_para text-center'>
            Mental health  that specializes in providing counseling and therapy services to individuals.
            They are dedicated to raising awareness and providing valuable information on corporate challenges.
            </p>
          </div>

          <ServiceList/>
        </div>
      </section>

      {/* ========================================  Service End   ======================================== */}

      {/* ======================================== Feature section =============================== */}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between flex-col lg:flex-row'>

            {/* ================================== Feature content ======================================= */}
            <div className='xl:w-[670px]'>
              <h2 className='heading'>Get Virtual Treatment <br/> anytime
              </h2>
              <ul className='pl-4'>
                <li className='text_para'>
                  1.Schedule the appointment directly.
                </li>
                <li className='text_para'>
                  2.Search for your therapist here, and contact their office.
                </li>
                <li className='text_para'>
                  3.View our therapist /psychologist who are accepting new patients, use the online scheduling tool 
                   to select an appointment time.
                </li>

              </ul>

              <Link to='/'><button className='btn'> Learn More</button></Link>
            </div>
            {/* ==================================== feature image ======================================== */}


             <div className="relative z-10 xl:w-[600px] flex justify-end mt-[30px] lg:mt-2 ms-[-100px]">
              <img src={featureImg} className='w-3/4'alt="" />
            
           
             </div>
          </div>
          </div>
        
      </section>
     {/* =============================  FEATURE SECTION END========================= */}
     {/* {/* ============================OUR GREAT DOCTORS ===================================    */}
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Our Great Doctors
            </h2>
            <HomeGreatDoctorList/>
            
          </div>
          
        </div>
        
      {/* ============================= Our great doctors ================================== */}

      {/* =================================== FAQ  ==================================== */}

     <section>
      <div className='container'>
        <div className='flex justify-between gap-[50px] lg:gap-0'>
          <div className='w-1/2 hidden md:block '>
            <img src={faqImg} alt="" />
            </div>
            <div className='w-full md:w-1/2'>
                <h2 className='heading'>Most question by our beloved patients</h2>
                <FaqList  />
            </div>


        </div>

      </div>
     </section>

     {/* ======================= Testimonial ===================== */}

    <section>
      
      <div className='container'>
         <div className='xl:w-[470px] mx-auto' >
            <h2 className='heading text-center'>What Our Patient Say</h2>
            <p className='text_para text-center'>
            Mental health  that specializes in providing counseling and therapy services to individuals.
            They are dedicated to raising awareness and providing valuable information on corporate challenges.
            </p>
          </div>
          <Testimonial/>
     </div>
     </section>
    </>
  );
}

export default Home;
