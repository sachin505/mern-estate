import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper,SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

function Home() {
  const [offerListings,setOfferListings]=useState([]);
  const [salesListings,setSalesListings]=useState([]);
  const [rentListings,setRentListings]=useState([]);
  SwiperCore.use([Navigation])
  useEffect(()=>{
    const fetchOfferListings =async()=>{
      try{
        const res=await fetch('api/listing/get?offer=true&limit=4');
        const data=await res.json();
        setOfferListings(data);
        console.log(offerListings);
        fetchRentListings()
      }
      catch(error){
        console.log(error);
      }
    };
    const fetchRentListings=async ()=>{
      try{
        const res=await fetch('api/listing/get?type=rent&limit=4');
        const data=await res.json();
        setRentListings(data);
        console.log(rentListings)
        fetchSaleListings();
      }
      catch(error){
        console.log(error);
      }
    }
    const fetchSaleListings=async ()=>{
      try{
        const res=await fetch('api/listing/get?type=sale&limit=4');
        const data=await res.json();
        setSalesListings(data);
        console.log(salesListings)
      }
      catch(error){
        console.log(error);
      }
    }
    fetchOfferListings();

  },[]);

  return (
    <div>
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next 
            <span className='text-slate-500'> perfect</span><br />
            place with ease
          </h1>
          <div className='text-gray-400 text-sm sm:text-sm'>
           This Estate is the best place to find your next perfect place to live.
           <br/>
           we have a wide range of properties for you to choose from.
          </div>
          <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's get started
          </Link>
        </div>
        <Swiper navigation>
        <div>
          {offerListings && offerListings.length>0 && offerListings.map(listing=>(
            <SwiperSlide>
              <div style={{background :`url(${listing.imageUrls[0]})center no-repeat`, backgroundSize:'cover'}} className='h-[500px] ' key={listing._id}></div>
            </SwiperSlide>
          )            
          )}
        </div>
        </Swiper>
        <div className='max-w-10xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {offerListings && offerListings.length>0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                  show more offers
                </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    offerListings.map(listing=>(
                      <ListingItem listing={listing} key={listing._id}/>
                    ))
                  }  
                </div>

            </div>
          )}
        </div>
        <div className='max-w-10xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {rentListings && rentListings.length>0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                  show more places for rent
                </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    rentListings.map(listing=>(
                      <ListingItem listing={listing} key={listing._id}/>
                    ))
                  }  
                </div>

            </div>
          )}
        </div>
        <div className='max-w-10xl mx-auto p-3 flex flex-col gap-8 my-10'>
          {salesListings && salesListings.length>0 && (
            <div className=''>
              <div className='my-3'>
                <h2 className='text-2xl font-semibold text-slate-600'>sales offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                  show more sales
                </Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                  {
                    salesListings.map(listing=>(
                      <ListingItem listing={listing} key={listing._id}/>
                    ))
                  }  
                </div>

            </div>
          )}
        </div>

    </div>
  )
}

export default Home