import React, { useState ,useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import uploadImageToCloudinary from '../../Utilis/uploadCloudinary.js';
import { BASE_URL, token } from '../../config.js';
import { toast} from 'react-toastify';

import HashLoader from 'react-spinners/HashLoader';

const Profile = ({user}) => { 


  const [selectedFile, setSelectedFile] = useState(null);
  
  const [loading, setLoading] = useState(false );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: 'null',
    gender: '',
    bloodType:'',
    whofillform:'',
    workstatus:'',
    howdidyouknowaboutus:'',
    sessionlokingfor:'',
    explainsituationandcondition:'',
    address:'',
  });

  const navigate = useNavigate();

  useEffect(()=>{
   setFormData({name:user.name, email:user.email,password:user.password, photo:user.photo,gender:user.gender, age:user.age,maritalStatus:user.maritalStatus})
  },[user])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization :`Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();


      if (!res.ok) {
        throw new Error(message);
      }

      toast.success(message);
      console.log(message);
      navigate('/users/profile/me');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='mt-10'>
       <form onSubmit={submitHandler}>
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
                  aria-readonly
                  readOnly
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
                  
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter your age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full py-3 pr-4 px-3 ms-10 border-b border-solid border-[#0066ff61] 
                  focus:outline-none focus:border-b-primaryColor text-[12px] leading-7 text-headingColor
                  placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 ms-10 flex items-center justify-between">
              
              
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
                <label className="text-headingColor font-bold text-[16px] leading-7">
                  Marital Status:
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="select">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  
                  </select>
                </label>
              </div>

              <div className="mb-5 ms-10 flex items-center justify-between">
              
              
                <label className="text-headingColor font-bold text-[16px] leading-7">
                Who is filling this form?
                :
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
                    name="howdidyouknowaboutus"
                    value={formData.howdidyouknowaboutus}
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
                  name="sessionlokingfor"
                  value={formData.sessionlokingfor}
                  onChange={handleInputChange}
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                >
                  <option value="select">Select</option>
                  <option value="referral">Mental Wellness Counselling</option>
                  <option value="googleSearch">Mental Wellness Therapy</option>
                  <option value="socialMedia">Physical Wellness Therapy</option>
                  <option value="privateCommunity">Emergency Injury/Trauma</option>
                  <option value="publicCommunity">Beauty</option>
                  <option value="publicCommunity">Diet</option>
                  <option value="publicCommunity">Fitness</option>
                  <option value="publicCommunity">Career and Growth Planning</option>
                  <option value="publicCommunity">Other</option>
                
                </select>
              </label>
            </div>

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
                   {selectedFile ? selectedFile.name:'Update Photo'}
                  </label>
                </div>
              </div>
              <div className="mt-7 ms-10">
                <button
                 disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[20px] leading-[30px] rounded-lg px-3 py-3"
                >
                   { loading ? <HashLoader size={35} color="#ffffff" /> : 'Update'}
                </button>
              </div>

             
            </form>
    </div>
  );
}

export default Profile;
