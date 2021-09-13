import { ISpotRepository } from './../../../repositories/ISpotRepository';
import { ISpotDTO } from '@modules/spots/dto/ISpotDTO'
import { DeepPartial, getMongoRepository, MongoRepository } from 'typeorm'
import { Spots } from '../schemas/Spots'
export class SpotRepository implements ISpotRepository {
    private repository: MongoRepository<Spots>

    constructor() {
        this.repository = getMongoRepository(Spots,"mongo")
    }

    public async create({ name, city,description,latitude,longitude,uf}: ISpotDTO): Promise<Spots> {

        const data:DeepPartial<Spots> = {
            name,
            description,
            latitude,
            longitude,
            city,
            uf,
            likes:0
        }

        const spot = this.repository.create(data)
        
        await this.repository.save(spot)

        return spot
    }    
    public async save(data: Spots): Promise<Spots> {
        return this.repository.save(data)
    }
    public async findById(id: string): Promise<Spots | undefined> {
        return await this.repository.findOne(id)
    }
    
    public async findAll(): Promise<Spots[]> {
        return await this.repository.find()
    }
    
    public async findByLatitudeAndLongitude(latitude: number,longitude:number): Promise<Spots | undefined> {
        return await this.repository.findOne({
            where:{
                latitude,
                longitude
            }
        })
    }
    
    public async delete(id: string): Promise<Spots | undefined> {
        const spot = await this.repository.findOne(id)

        if (spot) {
            await this.repository.delete({ id: spot.id })
        }
        return spot
    }

}