import {container} from 'tsyringe'
import { Request,Response } from "express";
import { CreateService } from '@modules/users/service/CreateService';
import { FindByIdService } from '@modules/users/service/FindByIdService';
import { classToClass } from 'class-transformer';
import { UpdateService } from '@modules/users/service/UpdateService';


export default class UserController {

    public async create(request:Request,response:Response){
        const{name,email,password,country} = request.body

        const createUser = container.resolve(CreateService)
        
        await createUser.execute({
            name,email,password,country
        })

        return response.status(201).json()
    }

    public async show(request:Request,response:Response){
        const { id } = request.params

        const findUser = container.resolve(FindByIdService)
        
        const user = await findUser.execute({
            id
        })

        return response.json(classToClass(user))
    }

    public async update(request:Request,response:Response){
        const{name,email,country} = request.body
        const {id} = request.params

        const updateUser = container.resolve(UpdateService)
        
        const updated = await updateUser.execute({
            id,name,email,country
        })

        return response.status(200).json(updated)
    }

}