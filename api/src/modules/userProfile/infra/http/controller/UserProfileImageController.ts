import {container} from 'tsyringe'
import { Request,Response } from "express";
import { CreateService } from '@modules/userProfile/service/CreateService';
import { FindByIdService } from '@modules/userProfile/service/FindByIdService';
import { UpdateService } from './../../../service/UpdateService';
import { UpdateImageService } from '@modules/userProfile/service/UpdateImageService';


export default class UserProfileImageController {

    public async update(request:Request,response:Response){
        const { id } = request.params
        const updateUserImageProfile = container.resolve(UpdateImageService)

        if(!request.file?.filename){
            return response.status(400).json({message:"send image"})
        }

        const userProfile = await updateUserImageProfile.execute({
            user_id:id,
            image:request.file.filename
        })

        return response.json(userProfile)
        
       return
    }

}