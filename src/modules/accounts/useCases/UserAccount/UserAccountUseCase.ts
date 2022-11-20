import {prisma} from '../../../../database/prismaClient'

interface IGetBalance{
    user_id:string
}

export class UserAccountUseCase{
    async execute({user_id}:IGetBalance){

       
        const user = await prisma.users.findFirst({
            where:{
                id:user_id
            }
        })
        if(!user)throw new Error('invalid user token')

        const account = await prisma.accounts.findFirst({
            where:{
                id:user.fk_accountId
            }
        })


        if(!account) throw new Error("Account not exist")

        return {
            account:{
            owner:user.username,
            balance:account.balance
            }
        }
    }
}