import express from 'express'
import {deleteUser, findAllUsers, getUserListings, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/VerifyUser.js';

const userRouter=express.Router();

userRouter.get('/findUsers',findAllUsers);
userRouter.post('/update/:id',verifyToken,updateUser);
userRouter.delete('/delete/:id',verifyToken,deleteUser);
userRouter.get('/listings/:id',verifyToken,getUserListings);

export default userRouter;