import {inject,injectable} from 'tsyringe'
import { ISpotRepository } from '../repositories/ISpotRepository';
import { Spots } from '../infra/typeorm/schemas/Spots';

@injectable()
export class FindAllService{

    constructor(
        @inject('SpotRepository')
        private repository:ISpotRepository,
    ){}

    public async execute(): Promise<Spots[]>{
        return await this.repository.findAll()
    }

}