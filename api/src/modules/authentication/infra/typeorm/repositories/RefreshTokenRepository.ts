import { RefreshToken } from './../schemas/RefreshToken';
import { getMongoRepository, MongoRepository } from 'typeorm'
import dayjs from 'dayjs'
import { IRefreshTokenRepository } from '@modules/authentication/repositories/IRefreshTokenRepository';

export class RefreshTokenRepository implements IRefreshTokenRepository{
    private repository: MongoRepository<RefreshToken>

    constructor() {
        this.repository = getMongoRepository(RefreshToken,"mongo")
    }

    public async create(userId:string): Promise<RefreshToken> {
        const expiresIn = dayjs().add(1,'day').unix()

        const refreshToken = this.repository.create({user_id:userId,expiresIn})
        await this.repository.save(refreshToken)
        return refreshToken
    }  

    public async findByUserId(userId: string): Promise<RefreshToken | undefined> {
        const refreshToken = await this.repository.findOne({where:{user_id:userId}})
        return refreshToken
    }

    public async deleteByUserId(userId:string):Promise<void>{
        const refreshToken = await this.repository.findOne({where:{user_id:userId}})

        if(refreshToken){
            await this.repository.deleteMany({id:refreshToken?.id})
        }
    }
}