import React from 'react';
import { BASE_URL } from '../../config';
import useFetchData from '../../Hooks/useFetchData';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import HomeSwiperDoctor from './HomeSwiperDoctor';

const HomeGreatDoctorList = () => {
    const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

    return (
        <>
            {loading && <Loader />}
            {error && <Error />}
            {!loading && !error && <HomeSwiperDoctor doctors={doctors} key={doctors._id} />}
        </>
    );
};

export default HomeGreatDoctorList;










// import React from 'react';
// import {BASE_URL} from '../../config'
// import useFetchData from '../../Hooks/useFetchData'
// import Loader from '../../components/Loader/Loading'
// import Error from '../../components/Error/Error'
// import HomeSwiperDoctor from './HomeSwiperDoctor';

// const HomeGreatDoctorList = () => {
//     const {data:doctors,loading,error}=useFetchData(`${BASE_URL}/doctors`)
  
 
//   return (
//     <>
//       {loading && <Loader/>}
//       {error &&  <Error/> }

//     { !loading && !error && 
    
//     <div >
      
//       {doctors.map((doctor) => (
        
//         <HomeSwiperDoctor key={doctor._id} doctor={doctor} />  // Use doctor.id or another unique property
        
//       ))}
      
   
// </div>
//     }
//   </>
//   );
// }

// export default HomeGreatDoctorList;
