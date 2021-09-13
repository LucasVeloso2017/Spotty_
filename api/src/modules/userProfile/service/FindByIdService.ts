import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { UserProfile } from './../infra/typeorm/schemas/UserProfile';
import { IUserProfileRepository } from './../repositories/IUserProfileRepository';
import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';

interface Request{
    user_id:string
}

@injectable()
export class FindByIdService{

    constructor(
        @inject('UserProfileRepository')
        private repository:IUserProfileRepository,
        @inject('UserRepository')
        private userRepository:IUserRepository,
    ){}


    public async execute({user_id}:Request): Promise<UserProfile>{
        const user = await this.userRepository.findById(user_id)
        
        if(!user){
            throw new AppError("User not found")
        }

        const userProfile = await this.repository.findByUserId(user.id.toString())

        if(!userProfile){
            throw new AppError("User Profile not found")
        }
    
        return userProfile
    }

}