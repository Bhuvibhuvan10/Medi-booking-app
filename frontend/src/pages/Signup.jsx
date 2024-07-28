// import React,{useState} from 'react';
// import signupImg from '../assets/signup.gif'
// // import avatar from '../assets/user-icon.png'
// import { Link,useNavigate} from 'react-router-dom';
// import uploadImageToCloudinary from '../Utilis/uploadCloudinary'
// import{BASE_URL} from '../config'
// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
// import HashLoader from 'react-spinners/HashLoader';

// const Signup = () => {
//   const [selectedFile,setSelectedFile]=useState(null)
//   const [previewUrl,setPreviewUrl]=useState('')
//   const [loading,setLoading]  =useState(false)
//   const [formData ,setFormData]=useState({
//     name:'',
//     email:'',
//     password:'',
//     photo :'',
//     gender:'',
//     role:'patient'
//   })

//   const navigate=useNavigate()
//     const handleInputChange =e =>{
//       setFormData({...formData,[e.target.name]:e.target.value})
//     }

//     const handleFileInputChange= async event=>{
//       const file=event.target.files[0]

//       const data=await uploadImageToCloudinary(file)
//       setPreviewUrl(data.url);
//       setSelectedFile(data.url);
//       setFormData({...formData,photo:data.url})
//     }

//     const submitHandler = async (event) => {
//       event.preventDefault();
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/auth/register`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(formData)  
//         });
    
//         const { message } = await res.json();
    
//         if (!res.ok) {
//           throw new Error(message);
//         }
    
//         toast.success(message);

//         navigate('/login');
//       } catch (err) {
//         toast.error(err.message);
//       } 
//       finally {
//         setLoading(false);
//       }
//     };

//   return (
//    <section className='px-5 xl:px-0'>
//     <div className='max-w-[1170px] mx-auto'>
//       <div className='grid grid-cols-1 lg:grid-cols-2'>
//         {/* ==========================  Img box ==================== */}
//         <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
//           <figure className='rounded-l-lg'>
//             <img src={signupImg} alt="" w-full rounded-l-lg />
//           </figure>
//         </div>

//         {/* ======================Sign up form====================== */}

//         <div className='rounded-l-lg lg:pt-16 py-10'>
//           <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10 ms-10'>Create an <span className='text-primaryColor'>account</span></h3>

//           <form onSubmit={submitHandler}>
//           <div className='mb-5'>
//           <input type="text" 
//           placeholder='Full Name'
//           name='name' 
//           value={formData.name}
//           onChange={handleInputChange}
//           className='w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//           focus:outline-none focus:border-b-primaryColor
//            text-[12px] leading-7 text-headingColor
//             placeholder:text-textColor cursor-pointer '
//             required
//           />
//         </div>

//         <div className='mb-5'>
//           <input type="email" 
//           placeholder='Enter your email'
//           name='email' 
//           value={formData.email}
//           onChange={handleInputChange}
//           className='w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//           focus:outline-none focus:border-b-primaryColor
//            text-[12px] leading-7 text-headingColor
//             placeholder:text-textColor cursor-pointer '
//             required
//           />
//         </div>
//           <div className='mb-5'>
//           <input type="password" 
//           placeholder='Enter Password'
//           name='password' 
//           value={formData.password}
//           onChange={handleInputChange}
//           className='w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//           focus:outline-none focus:border-b-primaryColor
//            text-[12px] leading-7 text-headingColor
//             placeholder:text-textColor cursor-pointer '
//             required
//           />
//         </div>

//         <div className='mb-5 ms-10 flex items-center justify-between'>
//           <label htmlFor='' className='text-headingColor font-bold text-[16px] leading-7'>
//             Are you a: 
//             <select 
//             name='role'
//             value={formData.role}
//             onChange={handleInputChange}
//             className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
//               <option value="patient">Patient</option>
//               <option value="doctor">Doctor</option>
//             </select>
//           </label>
//           <label htmlFor='' className='text-headingColor font-bold text-[16px] leading-7'>
//             Gender: 
//             <select 
//             name='gender'
//             value={formData.gender}
//             onChange={handleInputChange}
//             className='text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none'>
//               <option value="select">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </label>

//         </div>

//         <div className='mb-5 ms-10 flex items-center gap-3'>
//         {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
//           <img src={previewUrl} alt="" className='w-full rounded-full'/>
//         </figure>}
//           <div className='relative w-[130px] h-[50px]'> 
//           <input type='file' name='photo' id='customFile'onChange={handleFileInputChange} accept='.jpg, .png' className='absolute top-0 left-0 w-full opacity-0 cursor-pointer'/>
//           <label htmlFor='customFile' className='absolute top-0 left-0 w-full h-full flex
//           items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
//           font-semibold rounded-lg truncate cursor-pointer'>
//             Upload Photo
//           </label>
//           </div>
//         </div>
//         <div className='mt-7 ms-10'>
//           <button disabled={loading && true}type='submit' className='w-full bg-primaryColor
//            text-white text-[20px] leading-[30px] rounded-lg px-3 py-3'>
//            {loading ? <HashLoader size={35} color='#ffffff'/> :'Sign UP'}</button>
//         </div>

//         <p className='mt-5 text-textColor text-center'>Don&apos;t have an account? <Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link></p>
//           </form>
//         </div>
//       </div>
//     </div>
//    </section>
//   );
// }

// export default Signup;
 
// 
// import React, { useState } from 'react';
// import signupImg from '../assets/signup.gif';
// import { Link, useNavigate } from 'react-router-dom';
// import uploadImageToCloudinary from '../Utilis/uploadCloudinary';
// import { BASE_URL } from '../config.js';
// import { toast } from 'react-toastify';

// import HashLoader from 'react-spinners/HashLoader';

// const Signup = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     photo: '',
//     gender: '',
//     role: 'patient',
//     whofillform: '',
//     workstatus: '',
//     howdoyouknowabout: '',
//     sessionlookingfor: '',
//     explainsituationandcondition: '',
//   });

//   const [isPatient, setIsPatient] = useState(true);

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === 'role') {
//       setIsPatient(e.target.value === 'patient');
//     }
//   };

//   const handleFileInputChange = async (event) => {
//     const file = event.target.files[0];
//     const data = await uploadImageToCloudinary(file);
//     setPreviewUrl(data.url);
//     setSelectedFile(data.url);
//     setFormData({ ...formData, photo: data.url });
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const { message } = await res.json();

//       if (!res.ok) {
//         throw new Error(message);
//       }

//       toast.success(message);
//       navigate('/login');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="px-5 xl:px-0">
//       <div className="max-w-[1170px] mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* Image box */}
//           <div className="hidden lg:block bg-primaryColor rounded-l-lg">
//             <figure className="rounded-l-lg">
//               <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
//             </figure>
//           </div>

//           {/* Sign up form */}
//           <div className="rounded-l-lg lg:pt-16 py-10">
//             <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ms-10">
//               Create an <span className="text-primaryColor">account</span>
//             </h3>

//             <form onSubmit={submitHandler}>
//               <div className="mb-5">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="password"
//                   placeholder="Enter Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>
//               {isPatient && (
//                 <>
//               <div className="mb-5 ms-10 flex items-center justify-between">
              
              
//               <label className="text-headingColor font-bold text-[16px] leading-7">
//               Who is filling this form?
//               :
//                 <select
//                   name="whofillform"
//                   value={formData.whofillform}
//                   onChange={handleInputChange}
//                   className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                 >
//                   <option value="select">Select</option>
//                   <option value="self">Self</option>
//                   <option value="parent">Parent Guardian</option>
//                   <option value="other">Other</option>
//                 </select>
//               </label>
//               <label className="text-headingColor font-bold text-[16px] leading-7 ">
//               How did you know about us?:
//                 <select
//                   name="howdidyouknowaboutus"
//                   value={formData.howdidyouknowaboutus}
//                   onChange={handleInputChange}
//                   className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                 >
//                   <option value="select">Select</option>
//                   <option value="referral">Referral</option>
//                   <option value="googleSearch">Google Search</option>
//                   <option value="socialMedia">Social Media</option>
//                   <option value="privateCommunity">Private Community</option>
//                   <option value="publicCommunity">Public Community</option>
                
//                 </select>
//               </label>
//             </div>
//             <div className="mb-5 ms-10 flex items-center justify-between">
            
            
//             <label className="text-headingColor font-bold text-[16px] leading-7">
//             Work Status:
//               <select
//                 name="workstatus"
//                 value={formData.workstatus}
//                 onChange={handleInputChange}
//                 className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//               >
//                 <option value="select">Select</option>
//                 <option value="student">Student</option>
//                 <option value="jobSeeker">Job Seeker</option>
//                 <option value="stayatHome">Stay-At-Home</option>
//                 <option value="salaried">Salaried</option>
//                 <option value="selfEmployed">Self-Employed</option>
//                 <option value="retired">Retired</option>
//                 <option value="other">Other</option>
//               </select>
//             </label>
//             <label className="text-headingColor font-bold text-[16px] leading-7 ">
//             What kind of session are you looking for?:
//               <select
//                 name="sessionlokingfor"
//                 value={formData.sessionlokingfor}
//                 onChange={handleInputChange}
//                 className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//               >
//                 <option value="select">Select</option>
//                 <option value="referral">Mental Wellness Counselling</option>
//                 <option value="googleSearch">Mental Wellness Therapy</option>
//                 <option value="socialMedia">Physical Wellness Therapy</option>
//                 <option value="privateCommunity">Emergency Injury/Trauma</option>
//                 <option value="publicCommunity">Beauty</option>
//                 <option value="publicCommunity">Diet</option>
//                 <option value="publicCommunity">Fitness</option>
//                 <option value="publicCommunity">Career and Growth Planning</option>
//                 <option value="publicCommunity">Other</option>
              
//               </select>
//             </label>
//           </div>

//                 </>
//               )}

//               <div className="mb-5 ms-10 flex items-center justify-between">
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                   Are you a:
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="patient">Patient</option>
//                     <option value="doctor">Doctor</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </label>
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                   Gender:
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="select">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </label>
//               </div>

              

//               <div className="mb-5 ms-10 flex items-center gap-3">
//                 {selectedFile && (
//                   <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
//                     <img src={previewUrl} alt="Preview" className="w-full rounded-full" />
//                   </figure>
//                 )}
//                 <div className="relative w-[130px] h-[50px]">
//                   <input
//                     type="file"
//                     name="photo"
//                     id="customFile"
//                     onChange={handleFileInputChange}
//                     className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
//                   />
//                   <label
//                     htmlFor="customFile"
//                     className="text-primaryColor border border-primaryColor text-[12px] leading-7 font-bold py-[6px] px-[16px] rounded-[5px] cursor-pointer absolute top-0 left-0 w-full h-full flex items-center justify-center"
//                   >
//                     Upload Photo
//                   </label>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="bg-green-400 ms-9 w-full text-white py-3 px-6 rounded-[5px] font-bold text-[14px] leading-7 hover:bg-primaryHover transition-all duration-300 ease-in-out"
//               >
//                 {loading ? (
//                   <HashLoader color="#fff" loading={loading} size={25} />
//                 ) : (
//                   'Sign Up'
//                 )}
//               </button>
//             </form>

//             <p className="mt-5 text-[14px] leading-7 text-headingColor ms-10">
//               Already have an account? <Link to="/login" className="text-primaryColor font-bold">Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signup;
// import React, { useState } from 'react';
// import signupImg from '../assets/signup.gif';
// import { Link, useNavigate } from 'react-router-dom';
// import uploadImageToCloudinary from '../Utilis/uploadCloudinary';
// import { BASE_URL } from '../config.js';
// import { toast } from 'react-toastify';

// import HashLoader from 'react-spinners/HashLoader';

// const Signup = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     photo: '',
//     gender: '',
//     role: 'patient',
//     whofillform: '',
//     workstatus: '',
//     howdoyouknowabout: '',
//     sessionlookingfor: '',
//     explainsituationandcondition: '',
//   });

//   const [isPatient, setIsPatient] = useState(true);
//   const [showConcernModal, setShowConcernModal] = useState(false);

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (e.target.name === 'role') {
//       setIsPatient(e.target.value === 'patient');
//     }
//   };

//   const handleFileInputChange = async (event) => {
//     const file = event.target.files[0];
//     const data = await uploadImageToCloudinary(file);
//     setPreviewUrl(data.url);
//     setSelectedFile(data.url);
//     setFormData({ ...formData, photo: data.url });
//   };

//   const submitHandler = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setShowConcernModal(true);
//   };

//   const handleModalOk = async () => {
//     setShowConcernModal(false);
//     try {
//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const { message } = await res.json();

//       if (!res.ok) {
//         throw new Error(message);
//       }

//       toast.success(message);
//       navigate('/login');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="px-5 xl:px-0">
//          {/* Concern Modal */}
//          {showConcernModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h2 className="text-lg font-bold mb-4">Confidentiality Notice</h2>
//             <p className="text-sm mb-6">All that you share with us will remain confidential and deeply private as per medical guidelines.</p>
//             <button
//               onClick={handleModalOk}
//               className="bg-primaryColor text-white py-2 px-4 rounded-lg"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//       <div className="max-w-[1170px] mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           {/* Image box */}
//           <div className="hidden lg:block bg-primaryColor rounded-l-lg">
//             <figure className="rounded-l-lg">
//               <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
//             </figure>
//           </div>

//           {/* Sign up form */}
//           <div className="rounded-l-lg lg:pt-16 py-10">
//             <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ms-10">
//               Create an <span className="text-primaryColor">account</span>
//             </h3>

//             <form onSubmit={submitHandler}>
//               <div className="mb-5">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="password"
//                   placeholder="Enter Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5 ms-10 flex items-center justify-between">
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                   Are you a:
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="patient">Patient</option>
//                     <option value="doctor">Doctor</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </label>
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                   Gender:
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="select">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </label>
//               </div>

//               {isPatient && (
//                 <>
//                              <div className="mb-5 ms-10 flex items-center justify-between">
              
              
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                 Who is filling this form?
//                 :
//                   <select
//                     name="whofillform"
//                     value={formData.whofillform}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="select">Select</option>
//                     <option value="self">Self</option>
//                     <option value="parent">Parent Guardian</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </label>
//                 <label className="text-headingColor font-bold text-[16px] leading-7 ms-[220px]">
//                 How did you know about us?:
//                   <select
//                     name="howdidyouknowaboutus"
//                     value={formData.howdidyouknowaboutus}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="select">Select</option>
//                     <option value="referral">Referral</option>
//                     <option value="googleSearch">Google Search</option>
//                     <option value="socialMedia">Social Media</option>
//                     <option value="privateCommunity">Private Community</option>
//                     <option value="publicCommunity">Public Community</option>
                  
//                   </select>
//                 </label>
//               </div>
//               <div className="mb-5 ms-10 flex items-center justify-between">
              
              
//               <label className="text-headingColor font-bold text-[16px] leading-7">
//               Work Status:
//                 <select
//                   name="workstatus"
//                   value={formData.workstatus}
//                   onChange={handleInputChange}
//                   className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                 >
//                   <option value="select">Select</option>
//                   <option value="student">Student</option>
//                   <option value="jobSeeker">Job Seeker</option>
//                   <option value="stayatHome">Stay-At-Home</option>
//                   <option value="salaried">Salaried</option>
//                   <option value="selfEmployed">Self-Employed</option>
//                   <option value="retired">Retired</option>
//                   <option value="other">Other</option>
//                 </select>
//               </label>
//               <label className="text-headingColor font-bold text-[16px] leading-7 ms-[250px]">
//               What kind of session are you looking for?:
//                 <select
//                   name="sessionlokingfor"
//                   value={formData.sessionlokingfor}
//                   onChange={handleInputChange}
//                   className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                 >
//                   <option value="select">Select</option>
//                   <option value="referral">Mental Wellness Counselling</option>
//                   <option value="googleSearch">Mental Wellness Therapy</option>
//                   <option value="socialMedia">Physical Wellness Therapy</option>
//                   <option value="privateCommunity">Emergency Injury/Trauma</option>
//                   <option value="publicCommunity">Beauty</option>
//                   <option value="publicCommunity">Diet</option>
//                   <option value="publicCommunity">Fitness</option>
//                   <option value="publicCommunity">Career and Growth Planning</option>
//                   <option value="publicCommunity">Other</option>
                
//                 </select>
//               </label>
//             </div>
//                   <div className="mb-5 ms-10">
//                     <textarea
//                       placeholder="Explain Your Situation and Condition"
//                       name="explainsituationandcondition"
//                       value={formData.explainsituationandcondition}
//                       onChange={handleInputChange}
//                       className="w-full py-3 pr-4 px-3 border-b border-solid border-[#0066ff61] 
//                       focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                       placeholder:text-textColor cursor-pointer"
//                     />
//                   </div>
//                 </>
//               )}

//               <div className="mb-5 ms-10 flex items-center gap-3">
//                 {selectedFile && (
//                   <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
//                     <img src={previewUrl} alt="Preview" className="w-full rounded-full" />
//                   </figure>
//                 )}
//                 <div className="relative w-[130px] h-[50px]">
//                   <input
//                     type="file"
//                     name="photo"
//                     id="customFile"
//                     onChange={handleFileInputChange}
//                     accept=".jpg, .png"
//                     className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
//                   />
//                   <label
//                     htmlFor="customFile"
//                     className="absolute top-0 left-0 w-full h-full flex
//                     items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
//                     font-semibold rounded-lg truncate cursor-pointer"
//                   >
//                     Upload Photo
//                   </label>
//                 </div>
//               </div>
//               <div className="mt-7 ms-10">
//                 <button
//                  disabled={loading && true}
//                   type="submit"
//                   className="w-full bg-primaryColor text-white text-[20px] leading-[30px] rounded-lg px-3 py-3"
//                 >
//                    { loading ? <HashLoader size={35} color="#ffffff" /> : 'Sign UP'}
//                 </button>
//               </div>

//               <p className="mt-5 text-textColor text-center">
//                 Already have an account?{' '}
//                 <Link to="/login" className="text-primaryColor font-medium ml-1">
//                   Login
//                 </Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>

   
//     </section>
//   );
// };

// export default Signup;

// import React, { useState } from 'react';
// import signupImg from '../assets/signup.gif';
// import { Link, useNavigate } from 'react-router-dom';
// import uploadImageToCloudinary from '../Utilis/uploadCloudinary';
// import { BASE_URL } from '../config.js';
// import { toast } from 'react-toastify';
// import HashLoader from 'react-spinners/HashLoader';

// const Signup = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showConcernModal, setShowConcernModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     photo: '',
//     gender: '',
//     role: 'patient',
//     whofillform: '',
//     workstatus: '',
//     howdoyouknowabout: '',
//     sessionlookingfor: '',
//     explainsituationandcondition: ''
//   });

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileInputChange = async (event) => {
//     const file = event.target.files[0];
//     const data = await uploadImageToCloudinary(file);
//     setPreviewUrl(data.url);
//     setSelectedFile(data.url);
//     setFormData({ ...formData, photo: data.url });
//   };

//   const handleModalOk = () => {
//     setShowConcernModal(false);
//     submitHandler();
//   };

//   // const submitHandler = async (event) => {
//   //   if (event) event.preventDefault();
//   //   setLoading(true);
//   //   try {
//   //     const res = await fetch(`${BASE_URL}/auth/register`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify(formData),
//   //     });

//   //     const { message } = await res.json();

//   //     if (!res.ok) {
//   //       throw new Error(message);
//   //     }

//   //     toast.success(message);
//   //     navigate('/login');
//   //   } catch (err) {
//   //     toast.error(err.message);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const submitHandler = async (event) => {
//     if (event) event.preventDefault();
//     setLoading(true);
  
//     try {
//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const { message } = await res.json();
  
//       if (!res.ok) {
//         throw new Error(message);
//       }
  
//       toast.success(message);
//       navigate('/login');
//     } catch (err) {
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleSubmitWithModal = (event) => {
//     event.preventDefault();
//     setShowConcernModal(true);
//   };

//   return (
//     <section className="px-5 xl:px-0">
//       <div className="max-w-[1170px] mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2">
//           <div className="hidden lg:block bg-primaryColor rounded-l-lg">
//             <figure className="rounded-l-lg">
//               <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
//             </figure>
//           </div>

//           <div className="rounded-l-lg lg:pt-16 py-10">
//             <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ms-10">
//               Create an <span className="text-primaryColor">account</span>
//             </h3>

//             <form onSubmit={handleSubmitWithModal}>
//               <div className="mb-5">
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5">
//                 <input
//                   type="password"
//                   placeholder="Enter Password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
//                   focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
//                   placeholder:text-textColor cursor-pointer"
//                   required
//                 />
//               </div>

//               <div className="mb-5 ms-10 flex items-center justify-between">
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                   Are you a:
//                   <select
//                     name="role"
//                     value={formData.role}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="patient">Patient</option>
//                     <option value="doctor">Doctor</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </label>
//                 <label className="text-headingColor font-bold text-[16px] leading-7">
//                   Gender:
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                   >
//                     <option value="select">Select</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </label>
//               </div>

//               {formData.role === 'patient' && (
//                 <>
//                          <div className="mb-5 ms-10 flex items-center justify-between">
              
              
//               <label className="text-headingColor font-bold text-[16px] leading-7">
//               Who is filling this form?
//               :
//                 <select
//                   name="whofillform"
//                   value={formData.whofillform}
//                   onChange={handleInputChange}
//                   className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                 >
//                   <option value="select">Select</option>
//                   <option value="self">Self</option>
//                   <option value="parent">Parent Guardian</option>
//                   <option value="other">Other</option>
//                 </select>
//               </label>
//               <label className="text-headingColor font-bold text-[16px] leading-7 ms-[220px]">
//               How did you know about us?:
//                 <select
//                   name="howdidyouknowaboutus"
//                   value={formData.howdidyouknowaboutus}
//                   onChange={handleInputChange}
//                   className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//                 >
//                   <option value="select">Select</option>
//                   <option value="referral">Referral</option>
//                   <option value="googleSearch">Google Search</option>
//                   <option value="socialMedia">Social Media</option>
//                   <option value="privateCommunity">Private Community</option>
//                   <option value="publicCommunity">Public Community</option>
                
//                 </select>
//               </label>
//             </div>
//             <div className="mb-5 ms-10 flex items-center justify-between">
            
            
//             <label className="text-headingColor font-bold text-[16px] leading-7">
//             Work Status:
//               <select
//                 name="workstatus"
//                 value={formData.workstatus}
//                 onChange={handleInputChange}
//                 className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//               >
//                 <option value="select">Select</option>
//                 <option value="student">Student</option>
//                 <option value="jobSeeker">Job Seeker</option>
//                 <option value="stayatHome">Stay-At-Home</option>
//                 <option value="salaried">Salaried</option>
//                 <option value="selfEmployed">Self-Employed</option>
//                 <option value="retired">Retired</option>
//                 <option value="other">Other</option>
//               </select>
//             </label>
//             <label className="text-headingColor font-bold text-[16px] leading-7 ms-[250px]">
//             What kind of session are you looking for?:
//               <select
//                 name="sessionlokingfor"
//                 value={formData.sessionlokingfor}
//                 onChange={handleInputChange}
//                 className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
//               >
//                 <option value="select">Select</option>
//                 <option value="referral">Mental Wellness Counselling</option>
//                 <option value="googleSearch">Mental Wellness Therapy</option>
//                 <option value="socialMedia">Physical Wellness Therapy</option>
//                 <option value="privateCommunity">Emergency Injury/Trauma</option>
//                 <option value="publicCommunity">Beauty</option>
//                 <option value="publicCommunity">Diet</option>
//                 <option value="publicCommunity">Fitness</option>
//                 <option value="publicCommunity">Career and Growth Planning</option>
//                 <option value="publicCommunity">Other</option>
              
//               </select>
//             </label>
//           </div>
//                 </>
//               )}

// <div className="mb-5 ms-10 flex items-center gap-3">
//                 {formData.photo && (
//                   <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
//                     <img src={formData.photo} alt="Preview" className="w-full rounded-full" />
//                   </figure>
//                 )}
//                 <div className="relative w-[130px] h-[50px]">
//                   <input
//                     type="file"
//                     name="photo"
//                     id="customFile"
//                     onChange={handleFileInputChange}
//                     accept=".jpg, .png"
//                     className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
//                   />
//                   <label
//                     htmlFor="customFile"
//                     className="absolute top-0 left-0 w-full h-full flex
//                     items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
//                     font-semibold rounded-lg truncate cursor-pointer"
//                   >
//                    {selectedFile ? selectedFile.name:'Update Photo'}
//                   </label>
//                 </div>
//               </div>

           

//               <div className="ms-10">
//                 <button
//                   type="submit"
//                   className="w-full bg-primaryColor text-white py-3 px-4 rounded-lg hover:bg-secondaryColor 
//                   focus:outline-none focus:bg-secondaryColor transition duration-300"
//                   disabled={loading}
//                 >
//                   {loading ? <HashLoader color="#ffffff" size={24} /> : 'Signup'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {showConcernModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg">
//             <p className="mb-4 text-headingColor">
//               All that you share with us will remain confidential and deeply private as per medical guidelines.
//             </p>
//             <button
//               onClick={handleModalOk}
//               className="bg-primaryColor text-white py-2 px-4 rounded-lg hover:bg-secondaryColor 
//               focus:outline-none focus:bg-secondaryColor transition duration-300"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import signupImg from '../assets/signup.gif';
import { Link, useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../Utilis/uploadCloudinary';
import { BASE_URL } from '../config.js';
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConcernModal, setShowConcernModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: '',
    gender: '',
    role: 'patient',
    whofillform: '',
    workstatus: '',
    howdoyouknowabout: '',
    sessionlookingfor: '',
    explainsituationandcondition: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const handleModalOk = () => {
    setShowConcernModal(false);
    submitHandler();
  };

  const submitHandler = async (event) => {
    if (event) event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      navigate('/login');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitWithModal = (event) => {
    event.preventDefault();
    setShowConcernModal(true);
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signupImg} alt="Signup" className="w-full rounded-l-lg" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pt-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 ms-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={handleSubmitWithModal}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 ms-10 flex items-center justify-between">
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Gender:
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="select">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>

              {formData.role === 'patient' && (
                <>
                  <div className="mb-5 ms-10 flex items-center justify-between">
                    <label className="text-headingColor font-bold text-[16px] leading-7">
                      Who is filling this form?:
                      <select
                        name="whofillform"
                        value={formData.whofillform}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                      >
                        <option value="select">Select</option>
                        <option value="self">Self</option>
                        <option value="parent">Parent Guardian</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                    <label className="text-headingColor font-bold text-[16px] leading-7 ms-[220px]">
                      How did you know about us?:
                      <select
                        name="howdoyouknowabout"
                        value={formData.howdoyouknowabout}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                      >
                        <option value="select">Select</option>
                        <option value="referral">Referral</option>
                        <option value="googleSearch">Google Search</option>
                        <option value="socialMedia">Social Media</option>
                        <option value="privateCommunity">Private Community</option>
                        <option value="publicCommunity">Public Community</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-5 ms-10 flex items-center justify-between">
                    <label className="text-headingColor font-bold text-[16px] leading-7">
                      Work Status:
                      <select
                        name="workstatus"
                        value={formData.workstatus}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                      >
                        <option value="select">Select</option>
                        <option value="student">Student</option>
                        <option value="jobSeeker">Job Seeker</option>
                        <option value="stayatHome">Stay-At-Home</option>
                        <option value="salaried">Salaried</option>
                        <option value="selfEmployed">Self-Employed</option>
                        <option value="retired">Retired</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                    <label className="text-headingColor font-bold text-[16px] leading-7 ms-[250px]">
                      What kind of session are you looking for?:
                      <select
                        name="sessionlookingfor"
                        value={formData.sessionlookingfor}
                        onChange={handleInputChange}
                        className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                      >
                        <option value="select">Select</option>
                        <option value="mentalWellnessCounseling">Mental Wellness Counseling</option>
                        <option value="mentalWellnessTherapy">Mental Wellness Therapy</option>
                        <option value="physicalWellnessTherapy">Physical Wellness Therapy</option>
                        <option value="emergencyInjuryTrauma">Emergency Injury/Trauma</option>
                        <option value="beauty">Beauty</option>
                        <option value="diet">Diet</option>
                        <option value="fitness">Fitness</option>
                        <option value="careerAndGrowthPlanning">Career and Growth Planning</option>
                        <option value="other">Other</option>
                      </select>
                    </label>
                  </div>
                  <div className="mb-5 ms-10">
                    <textarea
                      placeholder="Explain your situation and condition"
                      name="explainsituationandcondition"
                      value={formData.explainsituationandcondition}
                      onChange={handleInputChange}
                      className="w-full py-3 pr-4 px-3 border-b border-solid border-[#0066ff61] 
                      focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
                      placeholder:text-textColor cursor-pointer"
                      required
                    />
                  </div>
                </>
              )}

              <div className="mb-5 ms-10 flex items-center gap-3">
                {formData.photo && (
                  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                    <img src={formData.photo} alt="Preview" className="w-full rounded-full" />
                  </figure>
                )}
                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept=".jpg, .png"
                    className="absolute top-0 left-0 w-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex
                    items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
                    font-semibold rounded-lg truncate cursor-pointer"
                  >
                    {selectedFile ? selectedFile.name : 'Update Photo'}
                  </label>
                </div>
              </div>

              <div className="ms-10">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white py-3 px-4 rounded-lg hover:bg-secondaryColor 
                  focus:outline-none focus:bg-secondaryColor transition duration-300"
                  disabled={loading}
                >
                  {loading ? <HashLoader color="#ffffff" size={24} /> : 'Signup'}
                </button>
              </div>
              <p className='mt-5 text-textColor text-center'>Don&apos;t have an account? <Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link></p>0
            </form>
          </div>
        </div>
      </div>

      {showConcernModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p className="mb-4 text-headingColor">
              All that you share with us will remain confidential and deeply private as per medical guidelines.
            </p>
            <button
              onClick={handleModalOk}
              className="bg-primaryColor text-white py-2 px-4 rounded-lg hover:bg-secondaryColor 
              focus:outline-none focus:bg-secondaryColor transition duration-300"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Signup;



 
