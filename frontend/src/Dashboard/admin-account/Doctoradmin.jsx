import React from 'react';

const Doctors = ({ doctors }) => {
  console.log('Doctors Admin',doctors)
  return (
    <div className="doctors p-4">
      <h2 className="text-2xl font-bold mb-4">Doctors</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Specialization</th>
            <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor._id}>
              <td className="py-2 px-4 border-b">{doctor.name}</td>
              <td className="py-2 px-4 border-b">{doctor.specialization}</td>
              <td className="py-2 px-4 border-b">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">View</button>
                {doctors.isApproved !== 'approved' && (
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => approveDoctor(doctor._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
