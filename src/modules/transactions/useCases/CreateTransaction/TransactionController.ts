import { Request,Response } from "express";
import { TransactionUseCase } from "./TransactionUseCase";

export class TransactionController{
   async  handle(req:Request,res:Response){

        const {username,cashOut} = req.body
        const {user_id}= req.headers

        const transactionUseCase = new TransactionUseCase()
      
        const result = await  transactionUseCase.execute({username,cashOut,id:user_id})

        return res.json(result)

    }
}