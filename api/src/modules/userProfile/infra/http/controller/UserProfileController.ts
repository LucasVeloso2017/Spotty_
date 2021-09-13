import {container} from 'tsyringe'
import { Request,Response } from "express";
import { CreateService } from '@modules/userProfile/service/CreateService';
import { FindByIdService } from '@modules/userProfile/service/FindByIdService';
import { UpdateService } from './../../../service/UpdateService';


export default class UserProfileController {

    public async create(request:Request,response:Response){
        const{description,stance,favorite_brands,favorite_spots} = request.body
        const { id } = request.params

        const createUser = container.resolve(CreateService)
        
        await createUser.execute({
            user_id:id,
            description,stance,favorite_brands,favorite_spots
        })

        return response.status(201).json()
    }

    public async show(request:Request,response:Response){
        const { id } = request.params

        const findUserProfile = container.resolve(FindByIdService)
        
        const userProfile = await findUserProfile.execute({
            user_id:id
        })

        return response.json(userProfile)
    }

    public async update(request:Request,response:Response){
        const{description,stance,favorite_brands,favorite_spots} = request.body
        const { id } = request.params

        const updateUserProfile = container.resolve(UpdateService)
        
        const userProfile = await updateUserProfile.execute({
            user_id:id,
            description,stance,favorite_brands,favorite_spots
        })

        return response.json(userProfile)
    }

}