import { SpotsImages } from "../infra/typeorm/schemas/SpotImages";

export interface ISpotImagesRepository{
    create(spotId:string,images:any[]):Promise<SpotsImages>
    save(data:SpotsImages):Promise<SpotsImages>
    findBySpotId(spotId:string):Promise<SpotsImages | undefined>
    delete(id:string):Promise<SpotsImages | undefined>
}