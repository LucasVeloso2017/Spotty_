import { IStorageProvider } from '@shared/container/providers/StorageProviders/models/IStorageProvider'
import uploadConfig from '../../../../../config/upload'
import fs from 'fs'
import path from 'path'
import FileType from 'file-type'
import aws, { S3 } from 'aws-sdk'

export default class S3Storageprovider implements IStorageProvider {
  private client: S3
  private mimeType: string

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    })
  }

  public async saveFile(file: string): Promise<string> {
    let content = null
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)

    const fileContent = await fs.promises.readFile(originalPath)

    fs.readFile(originalPath, async (err, data) => {
      const ContentType = await FileType.fromBuffer(data)

      if (!ContentType) {
        throw new Error('File not found')
      }
      await this.client
        .putObject({
          Bucket: uploadConfig.config.aws.bucket,
          Key: file,
          ACL: 'public-read',
          Body: fileContent,
          ContentType: ContentType.mime
        })
        .promise()
    })



    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise()
  }
}