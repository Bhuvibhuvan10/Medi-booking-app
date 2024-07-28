import useFetchData from "../../Hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';

const MyBooking = () => {
  const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div className="container">
      {loading && <Loading />}

      {error && <Error errMessage={error} />}

      {!loading && !error && (
        <>
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500 mt-10">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Doctor Name</th>
                    <th scope="col" className="px-6 py-3">Payment</th>
                    <th scope="col" className="px-6 py-3">Price</th>
                    <th scope="col" className="px-6 py-3">Booked On</th>
                    <th scope="col" className="px-6 py-3">Appointment Date</th>
                    <th scope="col" className="px-6 py-3">Appointment Time</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                        <img
                          src={appointment.doctor.photo || 'default-image-url.jpg'} // Use a default image if photo is not available
                          alt={appointment.doctor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">{appointment.doctor.name}</div>
                        </div>
                      </th>
                    
                      <td className="px-6 py-4">
                        {appointment.isPaid ? (
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>Paid
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-800 mr-2"></div>Unpaid
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">{appointment.ticketPrice}</td>
                      <td className="px-6 py-4">{new Date(appointment.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{appointment.appointmentTime}</td> {/* Display Appointment Time */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
              You do not have any current appointments
            </h2>
          )}
        </>
      )}
    </div>
  );
};

export default MyBooking;




// import useFetchData from "../../Hooks/useFetchData";
// import { BASE_URL } from "../../config";
// import DoctorCard from './../../components/Doctors/DoctorCard';
// import Loading from '../../components/Loader/Loading';
// import Error from '../../components/Error/Error';

// const MyBooking = () => {
//   const { data: appointments, loading, error } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

//   return (
//     <div className="container">
//       {loading && <Loading />}

//       {error && <Error errMessage={error} />}

//       {!loading && !error && (
//         <>
//           {appointments.length > 0 ? (
//             <div className='grid grid-cols-1 lg:grid-cols-1 gap-5'>
//               {appointments.map(appointment => (
//                 <DoctorCard doctor={appointment.doctor} key={appointment._id} />
//               ))}
//             </div>
//           ) : (
//             <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
//               You did not book any doctor yet
//             </h2>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default MyBooking;


















// import useFetchData from "../../Hooks/useFetchData";
// import { BASE_URL } from "../../config";
// import DoctorCard from './../../components/Doctors/DoctorCard';
// import Loading from '../../components/Loader/Loading'
// import Error from '../../components/Error/Error'

// const MyBooking = () => {

//   const {data:appointments,loading,error}=useFetchData(`${BASE_URL}/users/appointments/my-appointments`)

//   return (
//     <div className="container">
//      {loading && <Loading/>}

//      {error && <Error errMessage={error}/>}

//      {!loading && !error && (<div className='grid grid-cols-1 lg:grid-cols-1 gap-5 '>
//       { appointments.map(doctor =><DoctorCard doctor={doctor} key={doctor._id} />)}
//       </div>
//       )}
//       {!loading && !error && appointments.length===0 && <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">You did not book any doctor yet</h2>}
//     </div>
//   );
// }

// export default MyBooking;
