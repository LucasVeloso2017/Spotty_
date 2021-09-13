import { Users } from './../infra/typeorm/schemas/User';
import {inject,injectable} from 'tsyringe'
import { IUserRepository } from '../repositories/IUserRepository'
import { AppError } from '@shared/errors/appError';

interface Request{
    id:string
}

@injectable()
export class FindByIdService{

    constructor(
        @inject('UserRepository')
        private repository:IUserRepository,
    ){}


    public async execute({id}:Request): Promise<Users>{
        const user = await this.repository.findById(id)

        if(!user){
            throw new AppError("User not find")
        }

        return user
    }

}