import { Users } from './../infra/typeorm/schemas/User';
import { IUserDTO } from './../dto/IUserDTO';

export interface IUserRepository{

    create(data:IUserDTO):Promise<Users>
    save(data:Users):Promise<Users>
    findById(id:string):Promise<Users | undefined>
    findByEmail(email:string):Promise<Users | undefined>
    delete(id:string):Promise<Users | undefined>
}