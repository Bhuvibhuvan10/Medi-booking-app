import React, { useState,useEffect } from 'react';
import Loader from '../../components/Loader/Loading.jsx';
import Error from '../../components/Error/Error.jsx';
import useGetProfile from '../../Hooks/useFetchData.jsx';
import { BASE_URL } from '../../config.js';
import Tab from './Tab.jsx';
import doctor from '../../assets/doc-logo.png';
import RadialChart from './RadialChart.jsx';
import Doctoradmin from '../admin-account/Doctoradmin.jsx'

const AdminDashboard = () => {
  const { data, loading, error } = useGetProfile(`${BASE_URL}/admins/profile/me`);

  const [tab, setTab] = useState('overview');
  const [numDoctors, setNumDoctors] = useState(0);
  const [numPatients, setNumPatients] = useState(0); // Dummy data for patients

  useEffect(() => {
    const fetchDoctorCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/doctors/count`);
        const result = await response.json();
        setNumDoctors(result.count);
        console.log(result.count)
      } catch (error) {
        console.error('Error fetching doctor count:', error);
      }
    };

    fetchDoctorCount();
  }, []);
  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/count`);
        const result = await response.json();
        setNumPatients(result.count);
        console.log(result.count)
      } catch (error) {
        console.error('Error fetching doctor count:', error);
      }
    };

    fetchPatientCount();
  }, []);

  return (
    <div className='max-w-[1170px] px-5 mx-auto'>
      {loading && !error && <Loader />}
      {error && !loading && <Error />}
      {!loading && !error && (
        <div className='grid lg:grid-cols-3 gap-[30px] lg-gap-[50px]'>
          <Tab tab={tab} setTab={setTab} />
          <div className='lg:col-span-2'>
            <div className='mt-8'>
              {tab === 'overview' && (
                <div className='flex flex-col gap-4 mb-10'>
                  <div className='bg-blue-500 text-white text-center py-4'>
                    <p className='text-lg font-semibold'>Welcome to Our Doctor Booking System</p>
                    <p className='text-sm mt-2'>Easily book appointments with top doctors in your area.</p>
                  </div>
                  <div className='flex flex-cols-3'>
                    <div className='max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
                      <div className='bg-blue-500 text-white py-4 text-center'>
                        <p className='text-lg font-semibold'>Doctors</p>
                      </div>
                      <div className='p-6 flex justify-between items-center gap-[40px]'>
                        <div className='text-center'>
                          <p className='text-gray-700 text-lg font-semibold'>Doctor</p>
                          <img src={doctor} alt='#' className='w-[30px]' />
                        </div>
                        <div className='text-center'>
                          <p className='text-gray-700 text-lg font-semibold'></p>
                          <p className='text-2xl mt-2'>{numDoctors}</p>
                        </div>
                      </div>
                    </div>
                    <div className='max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
                      <div className='bg-blue-500 text-white py-4 text-center'>
                        <p className='text-lg font-semibold'>Patients</p>
                      </div>
                      <div className='p-6 flex justify-between items-center gap-[40px]'>
                        <div className='text-center'>
                          <p className='text-gray-700 text-lg font-semibold'>doctor</p>
                          <img src={doctor} alt='#' className='w-[0px]' />
                        </div>
                        <div className='text-center'>
                          <p className='text-gray-700 text-lg font-semibold'></p>
                          <p className='text-2xl mt-2'>{numPatients}</p>
                        </div>
                      </div>
                    </div>
                    <div className='max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
                      <div className='bg-blue-500 text-white py-4 text-center'>
                        <p className='text-lg font-semibold'>Staffs</p>
                      </div>
                      <div className='p-6 flex justify-between items-center gap-[40px]'>
                        <div className='text-center'>
                          <p className='text-gray-700 text-lg font-semibold'>doctor</p>
                          <img src={doctor} alt='#' className='w-[0px]' />
                        </div>
                        <div className='text-center'>
                          <p className='text-gray-700 text-lg font-semibold'></p>
                          <p className='text-2xl mt-2'>2000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='min-h-screen flex items-center justify-center bg-gray-100'>
                    <RadialChart doctorData={numDoctors} patientData={numPatients} />
                  </div>
                </div>
              )}
              {tab==='doctors' && <Doctoradmin doctors={ data?.doctors}/>}
              {tab==='appointments' && <Appointment appointments={ data?.appointments}/>}
              {tab==='settings' && <ProfileDoctor doctorData={data}/>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
