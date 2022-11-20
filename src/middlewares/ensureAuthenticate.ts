import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

    interface IPayload{
        sub:string
    }

export async function ensureAthenticate(req:Request,res:Response,next:NextFunction){
    //verifica se a um token
    const authHeader = req.headers.authorization
    
    //validção de token
    if(!authHeader) res.status(401).json({message:"token missing"})
    
    //padrão token: Bearear 4394839483-3943948394
    //pegando somente o token
    const [, token] = authHeader.split(" ")
    
    try{
       const {sub} = verify(token,"eae694fc09c8f40eada175e66c50ec14") as IPayload
       

       req.user_id = sub
       return next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}