import { Request, Response } from "express";
import { ListCashOutTransactionsUseCase } from "./ListCashOutTransactionsUseCase";


export class ListCashOutTransactionsController{
    async handle(req:Request,res:Response){
        const {user_id} = req

        const listCashOutTransactionsUseCase = new ListCashOutTransactionsUseCase()

        const result = await listCashOutTransactionsUseCase.execute({user_id})

        return res.json(result)
    }
}