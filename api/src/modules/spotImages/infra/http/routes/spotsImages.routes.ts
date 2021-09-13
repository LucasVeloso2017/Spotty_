import uploadConfig from "@config/upload";
import { Router } from "express";
import multer from "multer";
import SpotImagesController from "../controller/SpotImagesController";

export const spotsImagesRoutes = Router()
const spotImagesController = new SpotImagesController()
const upload = multer(uploadConfig.multer)

spotsImagesRoutes.post('/:id',upload.array('image',3),spotImagesController.create)
spotsImagesRoutes.get('/:id',spotImagesController.show)