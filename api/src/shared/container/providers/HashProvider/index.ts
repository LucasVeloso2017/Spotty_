import  { HashProvider }  from '@shared/container/providers/HashProvider/implementations/HashProviderService';
import  { IHashProvider }  from '@shared/container/providers/HashProvider/models/IHashProvider';
import { container } from 'tsyringe'

const providers = {
    hash:HashProvider
}

container.registerSingleton<IHashProvider>(
    'HashProvider',providers.hash
)
