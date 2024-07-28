import React, { useState,useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImageToCloudinary from '../../Utilis/uploadCloudinary.js'
import { BASE_URL,token } from '../../config.js';
import { toast } from 'react-toastify';
import { LuIndianRupee } from "react-icons/lu";

const ProfileDoctor = ({doctorData}) => {
    const [formData, setFormData]= useState({
        name:'',
        email:'',
        password:'',
        phone:'',
        bio:'',
        gender:'',
        specialization:'',
        language:'',
        qualifications:[],
        experiences:[],
        timeSlots:[],
        about:'',
        photo:null,
        ticketPrice:'',
        professionalAffiliation:''
    })


    useEffect(()=>{
      setFormData({
        name:doctorData?.name,
        email:doctorData?.email,
        password:doctorData?.password,
        phone:doctorData?.phone,
        bio:doctorData?.bio,
        gender:doctorData?.gender,
        specialization:doctorData?.specialization,
        language:doctorData?.language,
        qualifications:doctorData?.qualifications,
        experiences:doctorData?.experiences,
        timeSlots:doctorData?.timeSlots,
        about:doctorData?.about,
        photo:doctorData?.photo,
        ticketPrice:doctorData?.ticketPrice,
        professionalAffiliation:doctorData?.professionalAffiliation
      })
    },[doctorData])
    const handleInputChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleFileInputChange=async e=>{
      const file= e.target.files[0]
      const data= await uploadImageToCloudinary(file)
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    }

    const updateProfileHandler=async e=>{
      e.preventDefault();
      try {
        const res=await fetch(`${BASE_URL}/doctors/${doctorData._id}`,{
        method:'PUT',
        headers:{
          'content-type':'application/json',
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(formData)
      })
      const result=await res.json();

      if(!res.ok){
        throw Error(result.message)
      }
      toast.success(result.message)
      } catch (err) {
        toast.error(err.message)
      }
    }
    // reusable  function  for adding  item
  
    const addItem=(key,item)=>{
      setFormData(prevFormData=>({...prevFormData,[key]:[...prevFormData[key],item]}))
    }

    // reusable function for deleting items
     
    const deleteItem=(key,index)=>{
      setFormData(prevFormData=>({...prevFormData,[key]:prevFormData[key].filter((_,i)=>i!== index),}))
    }

    // reusable input change function
    const handleReusableInputChangeFunc=(key,index,event)=>{
      const {name,value}=event.target

      setFormData(prevFormData=>{
        const updateItems=[...prevFormData[key]]
        updateItems[index][name]=value
        return{
          ...prevFormData,
          [key]:updateItems
        }
      })
    }
    const addQualification =e=>{
      e.preventDefault()
      addItem('qualifications',{
         startingDate:'',endingDate:'',degree:'',university:''
      })
    }

    const handleQualificationChange=(event,index)=>{
      handleReusableInputChangeFunc('qualifications',index,event)
    }

    const deleteQualification=(e,index)=>{
      e.preventDefault()
      deleteItem('qualifications', index)
    }
    const addExperience =e=>{
      e.preventDefault()
      addItem('experiences',
        {startingDate:'',endingDate:'',position:'',hospital:''}
      )
    }

    const handleExperienceChange=(event,index)=>{
      handleReusableInputChangeFunc('experiences',index,event)
    }

    const deleteExperience=(e,index)=>{
      e.preventDefault()
      deleteItem('experiences', index)
    }
    const addTimeSlots =e=>{
      e.preventDefault()
      addItem('timeSlots',
        {day:'monday',startingTime:'08:52', endingTime:'9:00'}
      )
    }

    const handleTimeSlotChange=(event,index)=>{
      handleReusableInputChangeFunc('timeSlots',index,event)
    }

    const deleteTimeSlots=(e,index)=>{
      e.preventDefault()
      deleteItem('timeSlots', index)
    }
  return (
    <div>
      <h2 className='text-headingColor font-bold text-[24px] leading-9  mb-10'>Profile Information</h2>

      <form action="">
        <div className='mb-5'>
            <p className='form_label'>Name*</p>
            <input type='text' name='name' value={formData.name} onChange={handleInputChange} placeholder='Full Name' className='form_input'/>
        </div>
        <div className='mb-5'>
            <p className='form_label'>Email*</p>
            <input type='text' name='email' value={formData.email} onChange={handleInputChange} placeholder='Email' className='form_input'/> 
        </div>
        <div className='mb-5'>
            <p className='form_label'>Phone*</p>
            <input type='number' name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone Number' className='form_input'  /> 
        </div>
        <div className='mb-5'>
            <p className='form_label'>Bio*</p>
            <input type='text' name='bio' value={formData.bio} onChange={handleInputChange} placeholder='Bio' className='form_input' maxLength={200}  /> 
        </div>
        <div className='mb-5'>
          <div className='grid grid-cols-3 gap-5 nd-[30px]'>
            <div>
            <p className='form_label'>Gender</p>
            <select name='gender' value={formData.gender} onChange={handleInputChange} className='form_input py=3.5'>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>
            </div>
            <div>
            <p className='form_label'>Specialization</p>
            <input name='specialization' value={formData.specialization} onChange={handleInputChange} className='form_input py=3.5'/>
            </div>
            <div>
              <p className='form_label'>Languages Spoken </p>
              <input name='language' value={formData.language} onChange={handleInputChange} className='form_input py=3.5'/>
            </div>

        </div>

        </div>
        <div className='mb-5'>
          <p className='form_label'>Qualification*</p>
          {formData.qualifications?.map((item,index)=><div key={index}>
            <div>
              <div className='grid grid-cols-2 gap-5'>
              <div>
                <p className='form_label'> Starting Date*</p>
                <input onChange={e=>handleQualificationChange(e,index)} type='date' name='startingDate' value={item.startingDate} className='form_input'/>
              </div>
              <div>
                <p className='form_label'> Ending Date*</p>
                <input onChange={e=>handleQualificationChange(e,index)} type='date' name='endingDate' value={item.endingDate} className='form_input'/>
              </div>
              </div>
              <div className='grid grid-cols-2 gap-5 mt-5'>
              <div>
                <p className='form_label'> Degree*</p>
                <input onChange={e=>handleQualificationChange(e,index)} type='text' name='degree' value={item.degree} className='form_input'/>
              </div>
              <div>
                <p className='form_label'> University*</p>
                <input onChange={e=>handleQualificationChange(e,index)} type='text' name='university' value={item.university} className='form_input'/>
              </div>
              </div>

            <button onClick={e=>deleteQualification(e,index)} className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete/></button>
            </div>
          </div>)}

          <button onClick={addQualification} className='bg-[#000] py-2 px-5 rounded text-white h-fit'>Add Qualification</button>


        </div>
        <div className='mb-5'>
          <p className='form_label'>Experiences*</p>
          {formData.experiences?.map((item,index)=><div key={index}>
            <div>
              <div className='grid grid-cols-2 gap-5'>
              <div>
                <p className='form_label'> Starting Date*</p>
                <input  type='date' name='startingDate' value={item.startingDate} className='form_input' onChange={e=>handleExperienceChange(e,index)}/>
              </div>
              <div>
                <p className='form_label'> Ending Date*</p>
                <input   type='date' name='endingDate' value={item.EndingDate} className='form_input' onChange={e=>handleExperienceChange(e,index)} />
              </div>
              </div>
              <div className='grid grid-cols-2 gap-5 mt-5'>
              <div>
                <p className='form_label'> Position*</p>
                <input  onChange={e=>handleExperienceChange(e,index)} type='text' name='position' value={item.position} className='form_input'/>
              </div>
              <div>
                <p className='form_label'> Hospital*</p>
                <input  onChange={e=>handleExperienceChange(e,index)} type='text' name='university' value={item.hospital} className='form_input'/>
              </div>
              </div>

            <button onClick={e=>deleteExperience(e,index)}className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete/></button>
            </div>
          </div>)}

          <button onClick={addExperience}className='bg-[#000] py-2 px-5 rounded text-white h-fit'>Add Experience</button>


        </div>
        <div className='mb-5'>
          <p className='form_label'>Time Slot*</p>
          {formData.timeSlots?.map((item,index)=><div key={index}>
            <div>
              <div className='grid grid-cols-2 md:grid-cols-4  mb-[30px] gap-5'>
              <div>
                <p className='form_label'> Day*</p>
                <select name="day" value={item.day} className='form_input py-3.5'onChange={e=>handleTimeSlotChange(e,index)}>
                  <option value="">Select</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                </select>
              </div>
              <div>
                <p className='form_label'> starting Time*</p>
                <input type='time' name='startingTime' value={item.startingTime} className='form_input' onChange={e=>handleTimeSlotChange(e,index)}/>
              </div>
              <div>
                <p className='form_label'> Ending Time*</p>

                <input type='time' name='endingTime' value={item.endingTime} className='form_input' onChange={e=>handleTimeSlotChange(e,index)}/> 
              </div>
                <div className='flex items-center'>
               <button onClick={e=>deleteTimeSlots(e,index)} className='bg-red-600 p-2 rounded-full text-white text-[18px]cursor-pointer mt-8 h-fit'><AiOutlineDelete/></button>
              </div>
           
              </div>
              

           
            </div>
          </div>)}

          <button onClick={addTimeSlots}className='bg-[#000] py-2 px-5 rounded text-white h-fit'>Add timeslot</button>


        </div>
        <div className="mb-5">
          <p className='form_label'>About</p>
          <textarea name='about' rows={5} value={formData.about} placeholder='Write about you' onChange={handleInputChange} className='form_input'></textarea>
        </div>
        <div>
          <label className='form_label'>Professional Affiliation</label>
          <textarea name='professionalAffiliation' rows={5} value={formData.professionalAffiliation} placeholder='Write about your professional affiliation' onChange={handleInputChange} className='form_input'>
          </textarea>
        </div>
        <div className="mb-5 ms-10  mt-5 flex items-center gap-3">
                {formData && (
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
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="absolute top-0 left-0 w-full h-full flex
                    items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor 
                    font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>

                 
                </div>
                <div className='flex float-right ms-48'>
                    <label className='mt-5'><LuIndianRupee className='font-bold m-4'/></label>
                    <input type='number'name='ticketPrice' className='form_input py-3.5' onChange={handleInputChange}/>
                  </div>
        </div>

        <div className='mt-7'><button type='submit' onClick={updateProfileHandler} className='bg-primaryColor text-white text-[18px] leading-[30px] py-3 px-4 rounded-lg w-full'>Update Profile</button></div>
      </form>
    </div>
  );
}

export default ProfileDoctor;
