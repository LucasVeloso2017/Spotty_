import { IHashProvider } from '@shared/container/providers/HashProvider/models/IHashProvider'
import { compare,hash } from 'bcryptjs'

export class HashProvider implements IHashProvider {
  
    public async generateHash(password:string):Promise<string>{
        const pass = hash(password,8)
        return pass
    }
    
    public async compareHash(password:string,hashedPassword:string):Promise<boolean>{
        const compared = compare(password,hashedPassword)
        return compared
    }


}

