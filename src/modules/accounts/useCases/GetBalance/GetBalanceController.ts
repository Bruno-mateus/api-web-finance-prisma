import { Request, Response } from "express";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

 
 export class GetBalanceController{
    async handle(req:Request, res:Response){
        
      const {user_id} = req

        console.log(user_id)
        const getBalanceUseCase = new GetBalanceUseCase()

       const result = await getBalanceUseCase.execute({user_id})

       return res.json(result)
    }
 }