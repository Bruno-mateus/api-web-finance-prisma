import { hash } from 'bcrypt'
import {prisma} from '../../../../database/prismaClient'
import {v4 as uuid} from 'uuid'
import { isRegExp } from 'util/types'

interface IUser{
    username:string
    password:string
}

export class CreateUserUseCase{
    async execute({username,password}:IUser){

        //validação de username 
        if(username.length < 3){
            throw new Error('The username has to have at least 3 characters')
        }

        // validação se usuario ja existe
        const clientAlreadyExist = await prisma.users.findFirst({
            where:{
                username:{
                    equals: username,
                    mode:"insensitive"
                }
            },
        })

        if(clientAlreadyExist){
            throw new Error('User already exist')
        }

        //regex para validar senha
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        //validando senha
        if(!regex.test(password)){
            throw new Error("Minimum of eight characters, at least one uppercase letter, one lowercase letter, and one number")
        }

        //criptografar senha
        const hashPassword = await hash(password,10)


        //criar conta com 100 em saldo
        const account = await prisma.accounts.create({
            data:{
                id:uuid(),
                balance:10000
               }
        })
        //criar usuario 
        const user = await prisma.users.create({
            data:{
                id:uuid(),
                username,
                password:hashPassword,
                fk_accountId:account.id                
            }
        })

        return user
    }
}