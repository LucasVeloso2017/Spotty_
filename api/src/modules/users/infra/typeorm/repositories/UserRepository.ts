import { Users } from './../schemas/User';
import { IUserRepository } from '@modules/users/repositories/IUserRepository'
import { getMongoRepository, MongoRepository } from 'typeorm'
import { IUserDTO } from '@modules/users/dto/IUserDTO';

export class UserRepository implements IUserRepository {
    private repository: MongoRepository<Users>

    constructor() {
        this.repository = getMongoRepository(Users,"mongo")
    }

    public async create({ name, email, password,country }: IUserDTO): Promise<Users> {
        const user = this.repository.create({ name, email, password,country })
        await this.repository.save(user)
        return user
    }    
    public async save(data: Users): Promise<Users> {
        return this.repository.save(data)
    }
    public async findById(id: string): Promise<Users | undefined> {
        const user = await this.repository.findOne(id)
        return user
    }
    public async findByEmail(email: string): Promise<Users | undefined> {
        const user = await this.repository.findOne({where:{email}})
        return user
    }
    public async delete(id: string): Promise<Users | undefined> {
        const user = await this.repository.findOne(id)

        if (user) {
            await this.repository.delete({ id: user.id })
        }
        return user
    }

}