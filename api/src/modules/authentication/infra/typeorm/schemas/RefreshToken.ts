import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

@Entity('refresh_token')
export class RefreshToken{

    @ObjectIdColumn()
    id:ObjectID

    @Column()
    expiresIn:number

    @Column()
    user_id:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}