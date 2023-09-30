import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/UserSlice'
import OAuth from '../components/OAuth'

function Sign_In() {
    const [formData,setFormData]=useState({})
    const {loading,error}=useSelector((state)=>state.user)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleChange=(event)=>{
        setFormData({...formData,[event.target.id]:event.target.value});
        console.log(formData)
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        try{
            dispatch(signInStart());
        const res=await fetch('/api/auth/signin-user',{
            method:'POST',
            headers :{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        });
            const data=await res.json()
            console.log(data);
            if(data.success==false){
                dispatch(signInFailure(data.message));
                return;
            }
            dispatch(signInSuccess(data))
            navigate('/')
        }
        catch(err){
            console.log("in catch block")
            console.log(err)
            dispatch(signInFailure(err));
        }
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font font-semibold my-7'>
            Sign In 
        </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
            <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'loading..':'Sign In'}</button>
            <OAuth />
        </form>
        
        <div className='flex gap-2 mt-5'>
            <p>create account ?</p>
            <Link to={"/sign-up"}>
                <span className='text-blue-700'>Sign Up</span>
            </Link>
        </div>
        {error!=null && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Sign_In