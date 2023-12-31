import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'

function Sign_Up() {
    const [formData,setFormData]=useState({})
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    const handleChange=(event)=>{
        setFormData({...formData,[event.target.id]:event.target.value});
        console.log(formData)
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        setLoading(true);
        try{
        const res=await fetch('/api/auth/signup-user',{
            method:'POST',
            headers :{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
        });
            const data=await res.json()
            console.log(data);
            if(data.success==false){
                setLoading(false);
                setError(data.message);
                return;
            }
            navigate('/sign-in')
            setLoading(false)
        }
        catch(err){
            console.log("in catch block")
            console.log(err)
            setError(err.message)
            setLoading(false)
        }
    }
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font font-semibold my-7'>
            Sign Up
        </h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
            <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
            <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
            <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'loading..':'Sign Up'}</button>
            <OAuth />
        </form>
        
        <div className='flex gap-2 mt-5'>
            <p>Have a account ?</p>
            <Link to={"/sign-in"}>
                <span className='text-blue-700'>Sign In</span>
            </Link>
        </div>
        {error!=null && <p className='text-red-500'>{error}</p>}
    </div>
  )
}

export default Sign_Up