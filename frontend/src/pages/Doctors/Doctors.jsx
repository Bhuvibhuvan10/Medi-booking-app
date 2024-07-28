import React, { useEffect, useState } from 'react';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Testimonial from '../../components/Testimonial/Testimonial';
import {BASE_URL} from '../../config'
import useFetchData from '../../Hooks/useFetchData.jsx'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const Doctors = () => {


  const [query,setQuery]=useState('')
  const [debounceQuery ,setDebounceQuery]=useState('')
  const {data:doctors,loading,error}=useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`)

  console.log('deb',debounceQuery)
  const handleSearch=()=>{setQuery(query.trim())
    console.log('handle search');
    console.log(query);
    
    
  }

  useEffect(()=>{
    

    const timeOut=setTimeout(()=>{
      setDebounceQuery(query)
    },700)

    return () => clearTimeout(timeOut)
  },[query])

  return (
    
    <>
     <section className='bg-[#fff9ea]'>
      <div className='container text-center'>
        <h2 className='heading'>Find a Doctor</h2>
        <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex item-center justify-between'>
          <input type='search' value={query} onChange={e=>setQuery(e.target.value)} className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor 'placeholder='Search Doctor by name or specification'/>
          <button className='btn mt-0 rounded-[0px] rounded-r-md'onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
     </section>


     <section>
      <div className="container">
      {loading &&  <Loader/>}
      {error &&  <Error/> }

    { !loading && !error && <div className='grid grid-cols-3 w-[100%] h-[500px] items-center justify-center'>
      {doctors.map((doctor)=><DoctorCard key={doctor._id} doctor={doctor}/>)}
    </div>}
      </div>
     </section>

     <section>
      
      <div className='container'>
         <div className='xl:w-[470px] mx-auto mt-[200px]' >
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

export default Doctors;
