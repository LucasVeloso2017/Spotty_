import { RefreshToken } from './../infra/typeorm/schemas/RefreshToken';
import { IRefreshTokenRepository } from './../repositories/IRefreshTokenRepository';
import { sign } from 'jsonwebtoken'
import { inject,injectable } from 'tsyringe';
import { AppError } from '@shared/errors/appError'
import authConfig from '@config/config'
import dayjs from 'dayjs'


interface Response{
    token:string,
    refreshToken?:RefreshToken
}

interface IRequest{
    id:string
}

@injectable()
export class RefreshTokenService{

    constructor(
        @inject("RefreshTokenRepository")
        private refreshToken:IRefreshTokenRepository,
    ){}

    public async execute({id}:IRequest):Promise<Response>{
        const refreshToken = await this.refreshToken.findByUserId(id)

        if(!refreshToken){
            throw new AppError("Refresh Token invalid")
        }

        const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

        const{ secret , expiresIn}=authConfig.jwt
       
        const token = sign({},secret,{
            subject:refreshToken.user_id.toString(),
            expiresIn
        })

        if(refreshTokenExpired){
            await this.refreshToken.deleteByUserId(refreshToken.user_id)

            const newRefreshToken = await this.refreshToken.create(refreshToken.user_id)
        
            return { token, refreshToken:newRefreshToken }
        }

        
        return { token }
    }   

}