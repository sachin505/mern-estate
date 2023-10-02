import express from 'express'
import {google, signIn, signOut, signUp} from '../controllers/auth.controller.js'

const authRouter=express.Router();

authRouter.post('/signup-user',signUp);
authRouter.post('/signin-user',signIn);
authRouter.post('/google',google);
authRouter.get('/signout',signOut)

export default authRouter;


