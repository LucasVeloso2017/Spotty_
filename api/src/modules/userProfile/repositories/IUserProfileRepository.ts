import { UserProfile } from '../infra/typeorm/schemas/UserProfile';
import { IUserProfileDTO } from '../dto/IUserProfileDTO';

export interface IUserProfileRepository{

    create(data:IUserProfileDTO):Promise<UserProfile>
    save(data:UserProfile):Promise<UserProfile>
    findByUserId(id:string):Promise<UserProfile | undefined>
    delete(id:string):Promise<UserProfile | undefined>    
}