import { container } from 'tsyringe'
import { IStorageProvider } from './models/IStorageProvider';
import { DiskStorageprovider } from './implementations/DiskStorageProvider';
import S3Storageprovider from './implementations/S3StorageProvider';
import upload from '../../../../config/upload';

const providers = {
    disk:DiskStorageprovider,
    s3:S3Storageprovider
}

const resolve = providers[upload.driver]


container.registerSingleton<IStorageProvider>(
    'StorageProvider',providers.disk
)
