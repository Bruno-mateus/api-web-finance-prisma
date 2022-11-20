import { Router } from "express";
import {ensureAthenticate} from './middlewares/ensureAuthenticate'
import { CreateUserController } from "./modules/users/useCases/createUser/createUserController";
import {AuthenticateUserController} from './modules/users/useCases/AuthenticateUser/AuthenticateUserController'
import {UserAccountController} from './modules/accounts/useCases/UserAccount/UserAccountController'
import {TransactionController} from './modules/transactions/useCases/CreateTransaction/TransactionController'
import {ListTransactionsController} from './modules/transactions/useCases/ListAllTransactions/ListTransactionsController'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const userAccountController = new UserAccountController()
const transactionController = new TransactionController()
const listTransactionsController = new ListTransactionsController()


routes.post('/user/',createUserController.handle,ensureAthenticate)

routes.post('/authenticate/',authenticateUserController.handle)

routes.get('/account/',ensureAthenticate,userAccountController.handle)

routes.post('/transaction/',ensureAthenticate,transactionController.handle)

routes.get('/transactions/',ensureAthenticate,listTransactionsController.handle)



export {routes}