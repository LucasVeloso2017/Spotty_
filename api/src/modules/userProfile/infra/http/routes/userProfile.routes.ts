import {Router} from 'express'
import uploadConfig from '@config/upload'
import multer from 'multer'
import UserProfileController from '../controller/UserProfileController'
import UserProfileImageController from '../controller/UserProfileImageController'

export const userProfileRoutes = Router()
const userProfileController = new UserProfileController()
const userProfileImageController = new UserProfileImageController()

const upload = multer(uploadConfig.multer)

userProfileRoutes.post("/:id",userProfileController.create)
userProfileRoutes.get("/:id",userProfileController.show)
userProfileRoutes.put("/:id",userProfileController.update)

userProfileRoutes.put("/image/:id",upload.single('image'),userProfileImageController.update)

