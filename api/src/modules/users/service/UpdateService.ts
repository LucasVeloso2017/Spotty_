import { Users } from './../infra/typeorm/schemas/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
interface Request{
    id:string
    name:string
    email:string
    country:string
}

@injectable()
export class UpdateService{

    constructor(
        @inject('UserRepository')
        private repository:IUserRepository,
    ){}


    public async execute({id,name,email,country}:Request): Promise<Users>{
        const user = await this.repository.findById(id)
        
        if(!user){
            throw new AppError("User not found")
        }
        
        const updatedUser:Users = Object.assign(user,{name,email,country})

        await this.repository.save(updatedUser)

        return updatedUser
    }

}