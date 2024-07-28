import React from 'react';

const Card = ({ numDoctors, numPatients }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white py-4 text-center">
        <p className="text-lg font-semibold">Health Dashboard</p>
      </div>
      <div className="p-6 flex justify-between items-center">
        <div className="text-center">
          <p className="text-gray-700 text-lg font-semibold">Doctors</p>
          <p className="text-2xl mt-2">{numDoctors}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-700 text-lg font-semibold">Patients</p>
          <p className="text-2xl mt-2">{numPatients}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
