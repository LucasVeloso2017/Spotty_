import { classToClass } from 'class-transformer';
import {container} from 'tsyringe'
import { Request,Response } from "express";
import { AuthenticateService } from '@modules/authentication/service/AuthenticateService';

export default class AuthenticationController {

    public async create(request:Request,response:Response){
        const{email,password} = request.body

        const auth = container.resolve(AuthenticateService)
        
        const {token,user,refreshToken} = await auth.execute({
            email,password
        })

        return response.status(201).json(classToClass({user,token,refreshToken}))
    }
}