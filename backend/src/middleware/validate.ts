import {Request,Response,NextFunction} from 'express';
import {AnyZodObject} from 'zod';


export const validate=(Schema:AnyZodObject)=>
    async(req:Request,res:Response,next:NextFunction)=>{
        try{
            await Schema.parseAsync({
               body:req.body,
               query:req.query,
               params:req.params
            });
             next();
        }catch(error){
             res.status(400).json({error});
        }

};