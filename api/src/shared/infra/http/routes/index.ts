import { Router } from "express";
import { authRoutes } from './../../../../modules/authentication/infra/http/routes/authentication.routes';
import { userProfileRoutes } from './../../../../modules/userProfile/infra/http/routes/userProfile.routes';
import { userRoutes } from './../../../../modules/users/infra/http/routes/user.routes';
import { spotsRoutes } from '@modules/spots/infra/http/routes/spots.routes';
import { spotsImagesRoutes } from '@modules/spotImages/infra/http/routes/spotsImages.routes';
import ensureAuth from "../middlewares/ensureAuth";


export const routes = Router()

routes.use('/users',userRoutes)
routes.use('/auth',authRoutes)

routes.use('/profile',ensureAuth,userProfileRoutes)
routes.use('/spots',ensureAuth,spotsRoutes)
routes.use('/spots-images',ensureAuth,spotsImagesRoutes)