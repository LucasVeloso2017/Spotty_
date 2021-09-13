import {inject,injectable} from 'tsyringe'
import { AppError } from '@shared/errors/appError';
import { ISpotRepository } from '../repositories/ISpotRepository';
import { Spots } from '../infra/typeorm/schemas/Spots';

interface Request{
    id:string
}

@injectable()
export class FindByIdService{

    constructor(
        @inject('SpotRepository')
        private repository:ISpotRepository,
    ){}


    public async execute({id}:Request): Promise<Spots>{
        const findSpot = await this.repository.findById(id)

        if(!findSpot){
            throw new AppError("This spot not exists")
        }
        
        return findSpot
    }

}