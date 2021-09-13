import { Spots } from './../infra/typeorm/schemas/Spots';
import { ISpotDTO } from "../dto/ISpotDTO";

export interface ISpotRepository{
    findByLatitudeAndLongitude(latitude: number,longitude:number): Promise<Spots | undefined>
    findAll(): Promise<Spots[]>
    create(data:ISpotDTO):Promise<Spots>
    save(data:Spots):Promise<Spots>
    findById(id:string):Promise<Spots | undefined>
    delete(id:string):Promise<Spots | undefined>
}