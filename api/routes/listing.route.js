import express from 'express'
import { createListing, deleteListing, getListing, updateListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/VerifyUser.js';

const listingRouter=express.Router();

listingRouter.post('/create',verifyToken,createListing)
listingRouter.delete('/delete/:id',verifyToken,deleteListing);
listingRouter.post('/updateListing/:id',verifyToken,updateListing);
listingRouter.get('/get/:id',getListing);

export default listingRouter;