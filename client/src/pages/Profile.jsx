import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'



function Profile() {
  const {currentUser}=useSelector((state)=>state.user)
  const fileRef=useRef(null)
  const [file,setFile]=useState(undefined)
  const [filePercent,setFilePercent]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({})

  //firebase storage
  // allow read;
  // allow write:if
	// request.resource.size <2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);
  
  const handleFileUpload=(file)=>{
    const storage=getStorage(app)
    const fileName= new Date().getTime()+file.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePercent(Math.round(progress));
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>{
          setFormData({...formData,avatar:downloadURL})
          setFileUploadError(false);
        })})
  }
  console.log(filePercent)
  console.log(file)
  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file'  ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile'  
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>{fileUploadError?
        <span className='text-red-700'>Error Image upload(image must be less then 2mb)</span>:
        (filePercent>0 && filePercent <100) ? (<span className='text-green-700'>{`uploading ${filePercent}%`}</span>):
        filePercent===100 ? (<span className='text-green-700'>Successfully Uploaded !</span>):""}</p>
        <input type='text' placeholder='username' id='username' className='border p-3 rounded-lg'/>
        <input type='text' placeholder='email' id='email' className='border p-3 rounded-lg'/>
        <input type='text' placeholder='password' id='password' className='border p-3 rounded-lg'/>
        <button type='button' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      </div>
  )
}

export default Profile