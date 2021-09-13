import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
import { ISpotImagesRepository } from '../repositories/ISpotImagesRepository';
import { SpotsImages } from '../infra/typeorm/schemas/SpotImages';
import { IStorageProvider } from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface Request{
    spot_id:string
    images:string[]
}

@injectable()
export class CreateService{

    constructor(
        @inject('SpotImagesRepository')
        private repository:ISpotImagesRepository,
        @inject("StorageProvider")
        private storageProvider:IStorageProvider,
    ){}

    public async execute({spot_id,images}:Request): Promise<SpotsImages>{

        const findSpot = await this.repository.findBySpotId(spot_id)

        if(images.length > 2){
            throw new AppError('The limit is 3 images')
        }
        
        images.map(async (e,i) =>{
            const spotImages = findSpot?.images 
            if(e === spotImages?.[i]){
                await this.storageProvider.deleteFile(spotImages?.[i])
            }
            await this.storageProvider.saveFile(e)
        
        })
        
        const spotImage = this.repository.create(spot_id.toString(),images)

        return spotImage
    }

}