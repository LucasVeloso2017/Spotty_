import multer, { StorageEngine } from 'multer'
import path from 'path'
import crypto from 'crypto'

interface UploadConfig{
    driver:'s3' | 'disk'
    tmpFolder:string
    uploadsFolder:string

    multer:{
        storage:StorageEngine
    }

    config: {
        disk: {}
        aws: {
          bucket: string
        }
    }
}

const tmpFolder = path.resolve(__dirname,'..','..','tmp')

export default{
    driver:process.env.STORAGE_DRIVER,
    tmpFolder:tmpFolder,
    uploadsFolder:path.resolve(tmpFolder,'uploads'),

    multer:{
        storage:multer.diskStorage({
            destination:tmpFolder,
            filename(request,file,cb){
                const fileHash = crypto.randomBytes(10).toString('hex')

                const fileName = `${fileHash}-${file.originalname}`

                return cb(null,fileName)
            },

        }),
    },
    config: {
        disk: {},
        aws: {
          bucket: 'surgicalmapp',
        },
      },

} as UploadConfig