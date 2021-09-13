import {container} from 'tsyringe'
import { Request,Response } from "express";
import { classToClass } from 'class-transformer';
import { CreateService } from '@modules/spotImages/services/CreateService';
import { FindBySpotIdService } from '@modules/spotImages/services/FindBySpotIdService';


export default class SpotImagesController {

    public async create(request:Request,response:Response){
        const{ id } = request.params
        const requestImages = request.files as Express.Multer.File[]
        const createSpot = container.resolve(CreateService)
        
        const images = requestImages.map(e => e.filename)

        await createSpot.execute({
            spot_id:id,images
        })

        return response.status(201).json()
    }
    public async show(request:Request,response:Response){
        const{ id } = request.params
        const findSpot = container.resolve(FindBySpotIdService)
        
        const spot = await findSpot.execute({
            spot_id:id
        })

        return response.json(spot)
    }
}