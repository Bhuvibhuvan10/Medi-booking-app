import React from 'react';

const AppointmentDetails = ({appointments}) => {
  return (
    <>
    
    <table className='w-full text-left text-sm text-gray-500 mt-10'>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
        <tr>
          <th scope='col' className='px-6 py-3'>Name</th>
          <th scope='col' className='px-6 py-3'>Gender</th>
          <th scope='col' className='px-6 py-3'>Payment</th>
          <th scope='col' className='px-6 py-3'>Price</th>
          <th scope='col' className='px-6 py-3'>Booked On</th>
        </tr>
      </thead>
      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
              <img
                src={item.doctor.photo || 'default-image-url.jpg'} // Use a default image if photo is not available
                alt={item.doctor.name}
                className='w-10 h-10 rounded-full'
              />
              <div className='pl-3'>
                <div className='text-base font-semibold'>{item.doctor.name}</div>
              </div>
            </th>
            <td className='px-6 py-4'>{item.doctor.gender}</td>
            <td className='px-6 py-4'>
              {item.isPaid ? (
                <div className='flex items-center'>
                  <div className='h-2.5 w-2.5 rounded-full bg-green-500 mr-2'></div>Paid
                </div>
              ) : (
                <div className='flex items-center'>
                  <div className='h-2.5 w-2.5 rounded-full bg-red-800 mr-2'></div>Unpaid
                </div>
              )}
            </td>
            <td className='px-6 py-4'>{item.ticketPrice}</td>
            <td className='px-6 py-4'>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
  );
}

export default AppointmentDetails;
