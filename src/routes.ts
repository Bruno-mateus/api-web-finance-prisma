import { Router } from "express";
import {ensureAthenticate} from './middlewares/ensureAuthenticate'
import { CreateUserController } from "./modules/users/useCases/createUser/createUserController";
import {AuthenticateUserController} from './modules/accounts/useCases/AuthenticateUser/AuthenticateUserController'
import {GetBalanceController} from './modules/accounts/useCases/GetBalance/GetBalanceController'
import {TransactionController} from './modules/transactions/useCases/CreateTransaction/TransactionController'
import {ListAllTransactionsController} from './modules/transactions/useCases/ListAllTransactions/ListAllTransactionsController'
import {ListCashInTransactionsController} from './modules/transactions/useCases/ListCashInTransactions/ListCashInTransactionsController'
import {ListCashOutTransactionsController} from './modules/transactions/useCases/ListCashOutTransactions/ListCashOutTransactionsController'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getBalanceController = new GetBalanceController()
const transactionController = new TransactionController()
const listAllTransactionsController = new ListAllTransactionsController()
const listCashInTransactionsController = new ListCashInTransactionsController()
const listCashOutTransactionsController = new ListCashOutTransactionsController()

routes.post('/user/',createUserController.handle,ensureAthenticate)

routes.post('/authenticate/',authenticateUserController.handle)

routes.get('/balance/',ensureAthenticate,getBalanceController.handle)

routes.post('/transaction/',ensureAthenticate,transactionController.handle)

routes.get('/transactions/',ensureAthenticate,listAllTransactionsController.handle)

routes.get('/transactions/cash-in/',ensureAthenticate,listCashInTransactionsController.handle)

routes.get('/transactions/cash-out/',ensureAthenticate,listCashOutTransactionsController.handle)

export {routes}