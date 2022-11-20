import { Request, Response } from "express";
import { ListTransactionsUseCase } from "./ListTransactionsUseCase";


export class ListTransactionsController{
    async handle(req:Request,res:Response){

        const {user_id} = req
        const {order} = req.body 

       const listAllTransactionsUseCase = new ListTransactionsUseCase()
        
        if(!order){ 
            const result = await listAllTransactionsUseCase.execute({user_id})
            return res.json(result)
    }else{
        const result = await listAllTransactionsUseCase.execute({user_id,order})
        return res.json(result)
    }

       
    }
}