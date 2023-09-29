import express from 'express'
import {signIn, signUp} from '../controllers/auth.controller.js'

const authRouter=express.Router();

authRouter.post('/signup-user',signUp);
authRouter.post('/signin-user',signIn);

export default authRouter;


