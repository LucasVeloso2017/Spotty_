import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { UserProfile } from './../infra/typeorm/schemas/UserProfile';
import { IUserProfileRepository } from './../repositories/IUserProfileRepository';
import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
interface Request{
    user_id:string
    description:string
    stance:"goofy" | "regular"
    favorite_brands:string
    favorite_spots:string
}

@injectable()
export class CreateService{

    constructor(
        @inject('UserProfileRepository')
        private repository:IUserProfileRepository,
        @inject('UserRepository')
        private userRepository:IUserRepository,
    ){}


    public async execute({user_id,description,stance,favorite_brands,favorite_spots}:Request): Promise<UserProfile>{
        const user = await this.userRepository.findById(user_id)
        
        if(!user){
            throw new AppError("User not found")
        }
        
        const userProfile = await this.repository.findByUserId(user.id.toString())

        if(userProfile){
            throw new AppError("The profile this user already exists")
        }

        return await this.repository.create({user_id,description,stance,favorite_brands,favorite_spots})

    }

}