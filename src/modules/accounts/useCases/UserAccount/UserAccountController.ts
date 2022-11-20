import { Request, Response } from "express";
import { UserAccountUseCase } from "./UserAccountUseCase";

 
 export class UserAccountController{
    async handle(req:Request, res:Response){
        
      const {user_id} = req

   
        const userAccountUseCase = new UserAccountUseCase()

       const result = await userAccountUseCase.execute({user_id})

       return res.json(result)
    }
 }