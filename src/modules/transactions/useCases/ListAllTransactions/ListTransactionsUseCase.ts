import {prisma} from '../../../../database/prismaClient'

 interface IListTranscations{
    user_id:string
    order?:'asc' | 'desc'
}

export class ListTransactionsUseCase{
    async execute({user_id,order='asc'}:IListTranscations){

        const user = await prisma.users.findFirst({
            where:{
                id:user_id
            }
        })

        if(!user) throw new Error('User not found')

        const account = await prisma.accounts.findFirst({
            where:{
                id:user.fk_accountId
            }
        })


        if(!account) throw new Error("Account not found")

        const allTransactions = await prisma.transactions.findMany({
            where:{
              
                    OR:[{           
                            fk_creditedAccountId:{
                                equals:account.id
                            },
                                          
                    },
                    {
                        fk_debitedAccountId:{
                            equals:account.id
                        }
                    }
                ]
                    
                
            },
            orderBy:{
                createdAt:order
            }

          
        })

        const transactionsCredited = await prisma.transactions.findMany({
            where:{
                fk_creditedAccountId:account.id
            },
            
        })

        const transactionsDebited = await prisma.transactions.findMany({
            where:{
                fk_debitedAccountId:account.id
            }
        })



        return [
            allTransactions,
            transactionsCredited,
            transactionsDebited,
    ]
    }
}