import { Users } from './../infra/typeorm/schemas/User';
import {inject,injectable} from 'tsyringe'
import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { IUserRepository } from '../repositories/IUserRepository'
import { AppError } from '@shared/errors/appError';
interface Request{
    name:string
    email:string
    password:string
    country:string
}

@injectable()
export class CreateService{

    constructor(
        @inject('UserRepository')
        private repository:IUserRepository,
        @inject("HashProvider")
        private hashProvider:IHashProvider,
    ){}


    public async execute({name,email,password,country}:Request): Promise<Users>{
        const checkUserExists = await this.repository.findByEmail(email) 
   
        if(checkUserExists){
            throw new AppError('This email already exists')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        const user = this.repository.create({
            name,
            email,
            password:hashedPassword,
            country
        })

        return user
    }

}