import { RefreshTokenService } from './../../../service/RefreshTokenService';
import {container} from 'tsyringe'
import { Request,Response } from "express";

export default class RefreshTokenController {

    public async create(request:Request,response:Response){
        const{id} = request.params

        const auth = container.resolve(RefreshTokenService)
        
        const results = await auth.execute({
            id
        })

        return response.status(201).json(results)
    }
}