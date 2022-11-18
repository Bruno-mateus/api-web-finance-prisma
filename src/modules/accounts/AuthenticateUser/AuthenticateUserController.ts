import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AutheticateUserUseCase";


export class AuthenticateUserController{
    async handle(req:Request,res:Response){

        const {username, password} = req.body

        const authenticateUserUseCase = new AuthenticateUserUseCase()
        
        const result = await authenticateUserUseCase.execute({username,password})

        return res.json(result)
    }
}