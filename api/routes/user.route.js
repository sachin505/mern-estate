import express from 'express'
import {findAllUsers, updateUser} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/VerifyUser.js';

const userRouter=express.Router();

userRouter.get('/findUsers',findAllUsers);
userRouter.post('/update/:id',verifyToken,updateUser);

export default userRouter;