import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import{prisma} from '../../../../database/prismaClient'
interface IAuthenticateUser{
    username:string
    password:string
}

export class AuthenticateUserUseCase{
    async execute({username,password}:IAuthenticateUser){
        //validar usuario
       const user = await prisma.users.findFirst({
        where:{
            username
        }
       })
       if(!user) throw new Error("Username or password incorrect")

       //comparar se senha corresponde
       const passwordMatch = await compare(password,user.password)
       if(!passwordMatch) throw new Error("Username or password incorrect")
       
       //gerar token
       const token = sign({username},"eae694fc09c8f40eada175e66c50ec14",{
        subject:user.id,
        expiresIn:"1d"
       })
       
       return token
    }
}