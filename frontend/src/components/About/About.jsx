import React from 'react';
import aboutImg from '../../assets/about.jpeg'
import {Link} from 'react-router-dom'




const About = () => {
  return (
    <section>
    <div className='container'>
    <div className='flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row'>
      {/* =============about img========== */}
      <div className='relative w-3/4 lg:w-1/2 xl:w-[50%] xl:h-[60%] z-10 order-2 lg:order-1'>
        <img src={aboutImg} alt="" />
     </div>
       {/* ==============about content============= */}
 
       <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
        <h2 className='heading'>Proud to be one of the nation best therapists</h2>
        <p className='text_para'>"State of well-being in which the individual realizes his or her abilities, can cope with the normal stresses of life, can work productively and fruitfully, and can contribute to his or her community".
        It likewise determines how an individual handles stress, interpersonal relationships, and decision-making.
        </p>
        <p className='text_para mt-[]'>There is growing evidence that is showing emotional abilities are associated with pro-social behaviors such as stress management and physical health." by Richard</p>

        <Link to='/'><button className='btn'>Learn More</button></Link>
       </div>
   </div>
 </div>
    </section>
  );
}

export default About;
