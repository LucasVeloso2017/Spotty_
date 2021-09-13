import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
import { ISpotRepository } from '../repositories/ISpotRepository';
import { Spots } from '../infra/typeorm/schemas/Spots';
interface Request{
    name:string
    description:string
    latitude:number
    longitude:number
    city:string
    uf:string
}

@injectable()
export class CreateService{

    constructor(
        @inject('SpotRepository')
        private repository:ISpotRepository,
    ){}


    public async execute({name,latitude,longitude,description,city,uf}:Request): Promise<Spots>{
        const findSpot = await this.repository.findByLatitudeAndLongitude(latitude,longitude)

        if(findSpot){
            throw new AppError("This spot already register")
        }

        const spot = await this.repository.create({
            name,latitude,longitude,description,city,uf
        })
        
        return spot
    }

}