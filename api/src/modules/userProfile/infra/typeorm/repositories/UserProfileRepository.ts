import { UserProfile } from '../schemas/UserProfile';
import { IUserProfileRepository } from '@modules/userProfile/repositories/IUserProfileRepository'
import { getMongoRepository, MongoRepository } from 'typeorm'
import { IUserProfileDTO } from '@modules/userProfile/dto/IUserProfileDTO';

export class UserProfileRepository implements IUserProfileRepository {
    private repository: MongoRepository<UserProfile>

    constructor() {
        this.repository = getMongoRepository(UserProfile,"mongo")
    }

    public async create({user_id,description,stance,favorite_spots,favorite_brands }: IUserProfileDTO): Promise<UserProfile> {
        const data = {user_id,description,stance,favorite_spots,favorite_brands}
        const user = this.repository.create(data)
        await this.repository.save(user)
        return user
    }    
    public async save(data: UserProfile): Promise<UserProfile> {
        return this.repository.save(data)
    }
    public async findByUserId(id: string): Promise<UserProfile | undefined> {
        const user = await this.repository.findOne({where:{user_id:id}})
        return user
    }
    public async delete(id: string): Promise<UserProfile | undefined> {
        const user = await this.repository.findOne(id)

        if (user) {
            await this.repository.delete({ id: user.id })
        }
        return user
    }

}