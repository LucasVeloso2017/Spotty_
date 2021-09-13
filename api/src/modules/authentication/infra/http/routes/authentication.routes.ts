import { Router } from 'express';
import AuthenticationController from '../controller/AuthenticationController';
import RefreshTokenController from '../controller/RefreshTokenController';

export const authRoutes = Router()
const authenticationController = new AuthenticationController()
const refreshTokenController = new RefreshTokenController()


authRoutes.post("/",authenticationController.create)
authRoutes.post("/refresh/:id",refreshTokenController.create)

