import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const PieChart = ({ doctorData, patientData }) => {
  const data = {
    labels: ['Doctors', 'Patients'],
    datasets: [
      {
        label: 'Health Data Distribution',
        data: [doctorData, patientData],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white py-4 text-center">
        <p className="text-lg font-semibold">Health Data Distribution</p>
      </div>
      <div className="p-6">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
