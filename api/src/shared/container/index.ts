import { RefreshTokenRepository } from './../../modules/authentication/infra/typeorm/repositories/RefreshTokenRepository';
import { IRefreshTokenRepository } from './../../modules/authentication/repositories/IRefreshTokenRepository';
import './providers'
import { SpotRepository } from './../../modules/spots/infra/typeorm/repositories/SpotRepository';
import { container } from 'tsyringe';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';
import { IUserProfileRepository } from '@modules/userProfile/repositories/IUserProfileRepository';
import { UserProfileRepository } from '@modules/userProfile/infra/typeorm/repositories/UserProfileRepository';
import { ISpotRepository } from '@modules/spots/repositories/ISpotRepository';
import { ISpotImagesRepository } from '@modules/spotImages/repositories/ISpotImagesRepository';
import { SpotImagesRepository } from '@modules/spotImages/infra/typeorm/repositories/SpotImagesRepository';



container.registerSingleton<IUserRepository>('UserRepository',UserRepository)
container.registerSingleton<IUserProfileRepository>('UserProfileRepository',UserProfileRepository)
container.registerSingleton<ISpotRepository>('SpotRepository',SpotRepository)
container.registerSingleton<ISpotImagesRepository>('SpotImagesRepository',SpotImagesRepository)

container.registerSingleton<IRefreshTokenRepository>('RefreshTokenRepository',RefreshTokenRepository)