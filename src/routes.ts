import { Router } from "express";
import { CreateUserController } from "./modules/users/useCases/createUser/createUserController";
import {AuthenticateUserController} from './modules/accounts/AuthenticateUser/AuthenticateUserController'
import {GetBalanceController} from './modules/accounts/GetBalance/GetBalanceController'
import {ensureAthenticate} from './middlewares/ensureAuthenticate'

const routes = Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()
const getBalanceController = new GetBalanceController()

routes.post('/user/',createUserController.handle)

routes.post('/authenticate/',authenticateUserController.handle)

routes.get('/balance/',ensureAthenticate,getBalanceController.handle)

export {routes}