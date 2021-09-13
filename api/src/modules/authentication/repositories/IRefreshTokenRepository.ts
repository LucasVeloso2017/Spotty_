import { RefreshToken } from './../infra/typeorm/schemas/RefreshToken';
export interface IRefreshTokenRepository{
    create(userId:string): Promise<RefreshToken> 
    findByUserId(userId: string): Promise<RefreshToken | undefined>
    deleteByUserId(userId: string): Promise<void>
}