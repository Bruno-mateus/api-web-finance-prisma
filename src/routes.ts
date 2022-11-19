import { Router } from "express";
import {ensureAthenticate} from './middlewares/ensureAuthenticate'
import { CreateUserController } from "./modules/users/useCases/createUser/createUserController";
import {AuthenticateUserController} from './modules/accounts/useCases/AuthenticateUser/AuthenticateUserController'
import {GetBalanceController} from './modules/accounts/useCases/GetBalance/GetBalanceController'
import {TransactionController} from './modules/transactions/useCases/CreateTransaction/TransactionController'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getBalanceController = new GetBalanceController()
const transactionController = new TransactionController()

routes.post('/user/',createUserController.handle)

routes.post('/authenticate/',authenticateUserController.handle)

routes.get('/balance/',ensureAthenticate,getBalanceController.handle)

routes.post('/transaction/',ensureAthenticate,transactionController.handle)

export {routes}