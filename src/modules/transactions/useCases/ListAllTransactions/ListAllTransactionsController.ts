import { Request, Response } from "express";
import { ListAllTransactionsUseCase } from "./ListAllTransactionsUseCase";


export class ListAllTransactionsController{
    async handle(req:Request,res:Response){

       const {user_id} = req

       const listAllTransactionsUseCase = new ListAllTransactionsUseCase()

       const result = await listAllTransactionsUseCase.execute({user_id})

       return res.json(result)
    }
}