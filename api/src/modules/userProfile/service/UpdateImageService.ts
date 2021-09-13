import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { UserProfile } from './../infra/typeorm/schemas/UserProfile';
import { IUserProfileRepository } from './../repositories/IUserProfileRepository';
import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
import { IStorageProvider } from '@shared/container/providers/StorageProviders/models/IStorageProvider';
interface Request{
    user_id:string
    image:string
}

@injectable()
export class UpdateImageService{

    constructor(
        @inject('UserProfileRepository')
        private repository:IUserProfileRepository,
        @inject('UserRepository')
        private userRepository:IUserRepository,
        @inject("StorageProvider")
        private storageProvider:IStorageProvider,
    ){}


    public async execute({user_id,image}:Request): Promise<UserProfile>{
        const user = await this.userRepository.findById(user_id)
        
        if(!user){
            throw new AppError("User not found")
        }
        
        const userProfile = await this.repository.findByUserId(user.id.toString())

        if(!userProfile){
            throw new AppError("The Profile this user not Exists")
        }

        if(userProfile.image){
            await this.storageProvider.deleteFile(userProfile.image)
        }


        const filename = await this.storageProvider.saveFile(image)

        const updatedProfile:UserProfile = Object.assign(userProfile,{image:filename})

        await this.repository.save(updatedProfile)

        return updatedProfile
    }

}