import {container} from 'tsyringe'
import { Request,Response } from "express";
import { classToClass } from 'class-transformer';
import { CreateService } from '@modules/spots/services/CreateService';
import { FindByIdService } from '@modules/spots/services/FindByIdService';
import { FindAllService } from '@modules/spots/services/FindAllService';


export default class SpotController {

    public async create(request:Request,response:Response){
        const{name,latitude,longitude,description,city,uf} = request.body

        const createSpot = container.resolve(CreateService)
        
        await createSpot.execute({
            name,latitude,longitude,description,city,uf
        })

        return response.status(201).json()
    }

    public async show(request:Request,response:Response){
        const { id } = request.params

        const findSpot = container.resolve(FindByIdService)
        
        const user = await findSpot.execute({
            id
        })

        return response.json(classToClass(user))
    }

    public async index(request:Request,response:Response){
        const findAll = container.resolve(FindAllService)
        
        const spot = await findAll.execute()

        return response.json(classToClass(spot))
    }

}