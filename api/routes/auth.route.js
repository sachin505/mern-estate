import express from 'express'
import {userAuth} from '../controllers/auth.controller.js'

const authRouter=express.Router();

authRouter.post('/postUser',userAuth);

export default authRouter;


