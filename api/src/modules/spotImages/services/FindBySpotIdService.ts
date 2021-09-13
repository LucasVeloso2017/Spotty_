import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
import { ISpotImagesRepository } from '../repositories/ISpotImagesRepository';
import { SpotsImages } from '../infra/typeorm/schemas/SpotImages';
import { IStorageProvider } from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface Request{
    spot_id:string
}

@injectable()
export class FindBySpotIdService{

    constructor(
        @inject('SpotImagesRepository')
        private repository:ISpotImagesRepository,
    ){}

    public async execute({spot_id}:Request): Promise<SpotsImages>{
        const spot = await this.repository.findBySpotId(spot_id)

        if(!spot){
            throw new AppError("This spot doesnt Exists")
        }

        return spot
    }

}