import { Column, CreateDateColumn, Entity, ManyToOne, ObjectID, ObjectIdColumn, UpdateDateColumn } from 'typeorm'

@Entity('spot_images')
export class SpotsImages{

    @ObjectIdColumn()
    id:ObjectID

    @Column()
    spot_id:string

    @Column()
    images:string[]

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}