import { ISpotImagesRepository } from '../../../repositories/ISpotImagesRepository';
import { getMongoRepository, MongoRepository } from 'typeorm'
import { SpotsImages } from '../schemas/SpotImages';

export class SpotImagesRepository implements ISpotImagesRepository {
    private repository: MongoRepository<SpotsImages>

    constructor() {
        this.repository = getMongoRepository(SpotsImages,"mongo")
    }

    public async create(spotId:string,images:any[]): Promise<SpotsImages> {
        return await this.repository.save(this.repository.create({spot_id:spotId,images}))
    }    
    public async save(data: SpotsImages): Promise<SpotsImages> {
        return this.repository.save(data)
    }
    public async findBySpotId(spotId: string): Promise<SpotsImages | undefined> {
        return await this.repository.findOne({where:{spot_id:spotId}})
    }
    public async delete(id: string): Promise<SpotsImages | undefined> {
        const spot = await this.repository.findOne(id)

        if (spot) {
            await this.repository.delete({ id: spot.id })
        }
        return spot
    }

}