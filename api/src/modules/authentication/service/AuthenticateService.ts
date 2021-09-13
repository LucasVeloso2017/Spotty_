import { RefreshToken } from './../infra/typeorm/schemas/RefreshToken';
import { IRefreshTokenRepository } from './../repositories/IRefreshTokenRepository';
import { IAuthenticationDTO } from './../dto/IAuthenticationDTO';
import { IHashProvider } from './../../../shared/container/providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { Users } from '@modules/users/infra/typeorm/schemas/User';
import { sign } from 'jsonwebtoken'
import { inject,injectable } from 'tsyringe';
import { AppError } from '@shared/errors/appError'
import authConfig from '@config/config'

interface Response{
    user:Users,
    token:string,
    refreshToken:RefreshToken
}

@injectable()
export class AuthenticateService{

    constructor(
        @inject("UserRepository")
        private usersRepository:IUserRepository,
        @inject("HashProvider")
        private hashProvider:IHashProvider,
        @inject("RefreshTokenRepository")
        private refreshToken:IRefreshTokenRepository,
    ){}

    public async execute({email,password}:IAuthenticationDTO):Promise<Response>{
      
        const user = await this.usersRepository.findByEmail(email)

        if(!user){
            throw new AppError('Incorrect Email/Password',401)
        }

        const passwordMacthed = await this.hashProvider.compareHash(password, user.password)

        if(!passwordMacthed){
            throw new AppError('Incorrect Email/Password',401)
        }
        
        await this.refreshToken.deleteByUserId(user.id.toString())

        const{ secret , expiresIn}=authConfig.jwt
       
        const token = sign({},secret,{
            subject:user.id.toString(),
            expiresIn
        })

        const refreshToken = await this.refreshToken.create(user.id.toString())

        return { user,token,refreshToken }
    }   

}