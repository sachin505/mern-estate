import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

function Listing() {
    SwiperCore.use([Navigation])
    const params=useParams();
    const [listing,setListing]=useState();
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(false);
    useEffect(()=>{
        const fetchisting=async()=>{
            try{
                setLoading(true);
                const res=await fetch(`/api/listing/get/${params.listingId}`)
                const data=await res.json();
                if(data.success===false){
                    setError(true);
                    setLoading(false);
                    return;
                }
            setListing(data);
            setLoading(false);
            }
            catch(error){
                setError(error);
                setLoading(false);
            }
        }
        fetchisting();
    },[])
    console.log(listing);
  return (
    <div>{loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
         {error && (<p className='text-center my-7 text-2xl'>Something went wrong!</p>)}
        {listing && !loading && !error && 
        <>
            <Swiper navigation>
                {listing.imageUrls.map(url=><SwiperSlide key={url}>
                    <div className='h-[550px]' style={{background :`url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                    </div>
                </SwiperSlide>)}
            </Swiper>
        </>}
    </div>
  )
}

export default Listing