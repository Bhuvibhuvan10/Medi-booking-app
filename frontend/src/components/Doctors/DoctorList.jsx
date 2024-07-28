import DoctorCard from './DoctorCard';
import {BASE_URL} from '../../config'
import useFetchData from '../../Hooks/useFetchData'
import Loader from '../../components/Loader/Loading'
import Error from '../../components/Error/Error'

const DoctorList = () => {

  const {data:doctors,loading,error}=useFetchData(`${BASE_URL}/doctors`)
  
 
  return (<>
      {loading && <Loader/>}
      {error &&  <Error/> }

    { !loading && !error && 
    
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 lg:gap-[30px] ms-[50px] mt-[30px] lg:mt-[55px] '>
      
      {doctors.map((doctor) => (
        
        <DoctorCard key={doctor._id} doctor={doctor} />  // Use doctor.id or another unique property
        
      ))}
      
    </div>

    }
  </>
   
  );
};


export default DoctorList;







// import {doctors} from '../../assets/data/doctor'
// import DoctorCard from './DoctorCard';
// const DoctorList = () => {
//   return (
//     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 lg:gap-[30px] ms-[50px] mt-[30px] lg:mt-[55px] '>
//       {doctors.map((doctors)=><DoctorCard key={doctors} doctors={doctors}/>)}
//     </div>
//   );
// }

// export default DoctorList;
