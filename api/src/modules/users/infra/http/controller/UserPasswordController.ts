import {container} from 'tsyringe'
import { Request,Response } from "express";
import { classToClass } from 'class-transformer';
import { UpdatePasswordService } from '@modules/users/service/UpdatePasswordService';


export default class UserPasswordController {

    public async update(request:Request,response:Response){
        const{password} = request.body
        const {id} = request.params

        const updateUser = container.resolve(UpdatePasswordService)
        
        const updated = await updateUser.execute({
            id,password
        })

        return response.status(200).json(updated)
    }

}