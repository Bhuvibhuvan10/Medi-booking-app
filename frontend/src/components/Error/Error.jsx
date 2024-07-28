

// const Error =  (errMessage) => {
//   return (
//     <div className="flex items-center justify-center w-full h-full">
//       <h3 className="text-headingColor text-[20px] leading-[30px] font-semibold">{errMessage}</h3>
      
//     </div>
//   );
// }

// export default Error;
import React from 'react';

const Error = ({ errMessage }) => {
  // Check if errMessage is not a string, convert it to a string or handle it appropriately
  const message = typeof errMessage === 'string' ? errMessage : JSON.stringify(errMessage);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <h3 className="text-headingColor text-[20px] leading-[30px] font-semibold">{message}</h3>
    </div>
  );
}

export default Error;
