import {prisma} from '../../../../database/prismaClient'

interface IListCashIn{
    user_id:string
}
export class ListCashInTransactionsUseCase{
    async execute({user_id}:IListCashIn){
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
                fk_creditedAccountId:account.id
            }
        })

        return transactions
    }
}