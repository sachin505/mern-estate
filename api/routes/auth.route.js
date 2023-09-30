import express from 'express'
import {google, signIn, signUp} from '../controllers/auth.controller.js'

const authRouter=express.Router();

authRouter.post('/signup-user',signUp);
authRouter.post('/signin-user',signIn);
authRouter.post('/google',google);

export default authRouter;


