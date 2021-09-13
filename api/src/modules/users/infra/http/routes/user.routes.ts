import {Router} from 'express'
import UserController from '../controller/UserController'
import UserPasswordController from '../controller/UserPasswordController'
import ensureAuth from '../middlewares/ensureAuth'

export const userRoutes = Router()
const userController = new UserController()
const userPasswordController = new UserPasswordController()


userRoutes.post('/',userController.create)
userRoutes.put('/reset_password/:id',userPasswordController.update)

userRoutes.use(ensureAuth)
userRoutes.get('/:id',userController.show)
userRoutes.put('/:id',userController.update)


