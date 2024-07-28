
// import { useState, useEffect } from 'react';

// const useFetchData = (url) => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       let token = localStorage.getItem('token');
//       let response = await fetch(url, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status === 401) {
//         const refreshToken = localStorage.getItem('refreshToken');
//         if (refreshToken) {
//           const refreshResponse = await fetch('http://localhost:8000/api/v1/refresh-token', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ refreshToken }),
//           });

//           if (refreshResponse.ok) {
//             const refreshData = await refreshResponse.json();
//             localStorage.setItem('accessToken', refreshData.accessToken);

//             // Retry the original request with the new token
//             token = refreshData.accessToken;
//             response = await fetch(url, {
//               headers: {
//                 'Authorization': `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//               },
//             });
//           } else {
//             throw new Error('Unable to refresh token');
//           }
//         } else {
//           throw new Error('No refresh token available');
//         }
//       }

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [url]);

//   return { data, error, loading };
// };

// export default useFetchData;


import {useEffect,useState} from 'react'
import { token } from '../config.js'


const useFetchData = (url) => {
    const [data, setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
        const fetchData =async()=>{
            setLoading(true)
           try {
            const res=await fetch(url,{
                headers:{Authorization:`Bearer ${token}`}
            })
              console.log(`Bearer ${token}`)
              console.log(url)
            
            const result=await res.json()

            if(!res.ok){
                throw new Error(result.message)
            }

            setData(result.data)
            setLoading(false)
            
           } catch (err) {
            setLoading(false)
            setError(err.message)
           }
           console.log(token);
        }
        fetchData()
    },[url])
  return {data,loading,error}

  
}

export default useFetchData;
