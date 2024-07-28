import React from 'react';

const Appointments = ({ appointments }) => {
  return (
    <div className="appointments">
      <h2>Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment.user.name}</td>
              <td>{appointment.doctor.name}</td>
              <td>{new Date(appointment.createdAt).toLocaleDateString()}</td>
              <td>{appointment.isPaid ? 'Paid' : 'Unpaid'}</td>
              <td>
                {/* Add buttons for view details, cancel, etc. */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
