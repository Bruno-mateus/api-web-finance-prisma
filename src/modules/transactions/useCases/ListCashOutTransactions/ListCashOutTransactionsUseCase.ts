import {prisma} from '../../../../database/prismaClient'

interface IListOut{
    user_id:string
}
export class ListCashOutTransactionsUseCase{
    async execute({user_id}:IListOut){
        const user = await prisma.users.findFirst({
            where:{
                id:user_id
            }
        })
        if(!user)throw new Error("User not found")

        const account = await prisma.accounts.findFirst({
            where:{
                id:user.fk_accountId
            }
        })
        if(!account)throw new Error("Account not found")

        const transactions = await prisma.transactions.findMany({
            where:{
                fk_debitedAccountId:account.id
            }
        })

        return transactions
    }
}