import React from 'react';
import {services} from "../assets/data/services"
import ServiceCard from '../components/Services/ServiceCard'
const Services = () => {
  return <section>
    
    <div className="container">
    <h2 className='heading text-center bg-[#fff9ea] h-[100px]'>Service We provide</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cold-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
      {services.map((item,index)=><ServiceCard item={item} index={index} key={index}/>)}
    </div>
  
    </div>
  </section>

}

export default Services;