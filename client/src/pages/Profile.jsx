import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useRef} from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase'
import { updateUserSuccess,updateUserFailure, updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'


function Profile() {
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  const fileRef=useRef(null);
  const [file,setFile]=useState(undefined);
  const [filePercent,setFilePercent]=useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const [showListingsError,setShowListingsError]=useState(false);
  const [showListingToUser,setShowListingToUser]=useState([]);
  const dispatch=useDispatch()

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
  const handleChange=(event)=>{
    setFormData({...formData,[event.target.id]:event.target.value});
  }
  const handleSubmit= async (event)=>{
    event.preventDefault(); 
    try{
      dispatch(updateUserStart());
      const res= await fetch(`api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data=await res.json()
      if(data.success==false){
        dispatch(updateUserFailure(data.message));
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }
    catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser=async()=>{
    try{
      dispatch(deleteUserStart());
      const res=await fetch(`api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }
    catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut=async()=>{
    try{
      
      dispatch(signOutUserStart())
      const res=await fetch('/api/auth/signout');
      const data=await res.json();
      if(data.success===false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    }
    catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }

  const handleShowListings=async ()=>{
    try{
      setShowListingsError(false);
      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data=await res.json();
      if(data.success===false){
        setShowListingsError(true);
        return
      }
      setShowListingToUser(data);

    }
    catch(error){
       setShowListingsError(true);
    }
  }
  console.log(filePercent)
  console.log(file)
  console.log(formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='file'  ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='profile'  
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>{fileUploadError?
        <span className='text-red-700'>Error Image upload(image must be less then 2mb)</span>:
        (filePercent>0 && filePercent <100) ? (<span className='text-green-700'>{`uploading ${filePercent}%`}</span>):
        filePercent===100 ? (<span className='text-green-700'>Successfully Uploaded !</span>):""}</p>
        <input type='text' 
          placeholder='username' 
          id='username' className='border p-3 rounded-lg' 
          defaultValue={currentUser.username} onChange={handleChange}/>
        <input type='text' 
          placeholder='email' id='email' 
          className='border p-3 rounded-lg' 
          defaultValue={currentUser.email} onChange={handleChange}/>
        <input type='text' placeholder='password' 
          id='password' className='border p-3 rounded-lg' onChange={handleChange}/>
        <button 
          disabled={loading} 
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading':'update'}</button>
          <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>
            Create Listing
          </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteUser}>Delete Account</span>
        <span className='text-red-700 cursor-pointer' onClick={handleSignOut}>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5 text-center'>{error?error:''}</p>
      <p className='text-green-700 mt-5 text-center'>{updateSuccess?'User updated successfully !':""}</p>
      <button className='text-green-700 mt-5 w-full' onClick={handleShowListings}> show listings</button>
      <p className='text-red-700 mt-5'>{showListingsError?'Error showing listings':''}</p>
      {showListingToUser.length>0 && 
      <div className="flex flex-col gap-4">
        <h1 className='text-center mt-7 text-2xl font-semibold'>Your listings</h1>
        {showListingToUser.map((listing)=>
        <div className="border rounded-lg p-3 flex justify-between items-center" key={listing._id}>
          <Link to={`/listing/${listing._id}`}>
            <img className="w-20 h-20" src={listing.imageUrls[0]}/>
          </Link>
          <Link to={`/listing/${listing._id}`}>
            <p className='text-slate-700 font-semibold flex-1 hover:underline truncate'>{listing.name}</p>
          </Link>
          <div className='flex flex-col items-center'>
            <button className='text-red-700 uppercase'>delete</button>
            <button className='text-green-700 uppercase'>edit</button>
          </div>
       </div>
       )}
      </div>
      }
      </div>
  )
}

export default Profile