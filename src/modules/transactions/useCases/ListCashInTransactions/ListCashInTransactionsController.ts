import { Request, Response } from "express";
import { ListCashInTransactionsUseCase } from "./ListCashInTransactionsUseCase";


export class ListCashInTransactionsController{
    async handle(req:Request,res:Response){
        const {user_id} = req

        const listCashInTransactionsUseCase = new ListCashInTransactionsUseCase()

        const result = await listCashInTransactionsUseCase.execute({user_id})

        return res.json(result)
    }
}