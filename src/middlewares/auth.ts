import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { UserInstance } from '../model/userModel';
const jwtsecret = process.env.JWT_SECRET as string;



/* =========================== EJS MIDDLEWARE ==================*/

export async function auth(req:Request | any, res:Response, next:NextFunction){
  try{
    
   const authorization = req.cookies.token;
 

   if(!authorization){
    return res.redirect('/login')
   }

 

   let verified = jwt.verify(authorization, jwtsecret);

   if(!verified){
    return res.redirect('/login')
   }

   const {id} = verified  as {[key:string]: string}

   //find user by id;
   const user = await UserInstance.findOne({where: {id}})

   if(!user){
    return res.redirect('/login')
   }

   req.user = verified
   next();

  }catch(err){
    return res.redirect('/login')
  }
}
