import {prisma} from '../../database/prismaClient'
import {v4 as uuid} from 'uuid'


interface ITransaction{
    id:string,
    username:string,
    cashOut:number
}

export class TransactionUseCase{



    async execute({id,username,cashOut}){

        const userCashOut = await prisma.users.findFirst({
            where:{
                id
            }
        })

  
        const userCashIn = await prisma.users.findFirst({
            where:{
                username
            }
        })
     
        if(!userCashIn)throw new Error("User not found")

        const accountDebited = await prisma.accounts.findFirst({
            where:{
                id:userCashOut.fk_accountId
            }
        })

        if(!accountDebited)throw new Error("Account not found")

       const accountCredited = await prisma.accounts.findFirst({
        where:{
            id:userCashIn.fk_accountId
        }
    })
    if(!accountCredited)throw new Error("Account not found")

    if(accountCredited.id === accountDebited.id) throw new Error("it is not possible to make a transfericna to yourself")

   if(cashOut<=0) throw new Error("Invalid balance")

    if(accountDebited.balance<cashOut || accountDebited.balance==0  ) throw new Error('insufficient balance')

    const withdraw = cashOut

   await prisma.accounts.update({
        data:{
            balance:accountDebited.balance-withdraw,    
        },
        
        where:{
            id:accountDebited.id
        }
    })

   await prisma.accounts.update({
        data:{
            balance:accountCredited.balance+withdraw,    
        },
        
        where:{
            id:accountCredited.id
    }})

    const transaction = await prisma.transactions.create({
        data:{
            id:uuid(),
            value:withdraw,
            fk_creditedAccountId:accountCredited.id,
            fk_debitedAccountId:accountDebited.id,
        }
    })



    return transaction

    }
}