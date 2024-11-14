import {Request,Response} from 'express';
import { authService } from '../services/auth.service';

export async function register(req:Request,res:Response){
    try{
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ user, token });
    }catch(error){
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
          } else {
            res.status(500).json({ error: 'Internal server error' });
          }
    }
}


export async function login(req:Request,res:Response){
    try{
        const { user, token } = await authService.login(req.body);
        res.status(200).json({ user, token });
    }catch(error){
        if (error instanceof Error) {
            res.status(401).json({ error: error.message });
          } else {
            res.status(500).json({ error: 'Internal server error' });
          }
    }
}

export const authController={
  register,
  login
}