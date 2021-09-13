import { Router } from "express";
import SpotController from "../controller/SpotController";

export const spotsRoutes = Router()
const spotController = new SpotController()

spotsRoutes.post('/',spotController.create)
spotsRoutes.get('/',spotController.index)
spotsRoutes.get('/:id',spotController.show)