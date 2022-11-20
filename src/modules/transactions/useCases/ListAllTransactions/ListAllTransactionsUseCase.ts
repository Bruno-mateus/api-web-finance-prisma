import {prisma} from '../../../../database/prismaClient'

 interface IListTranscations{
    user_id:string
}

export class ListAllTransactionsUseCase{
    async execute({user_id}:IListTranscations){

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

          
        })

   

        return allTransactions
    }
}