import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn,OneToMany } from 'typeorm'

@Entity('spots')
export class Spots{

    @ObjectIdColumn()
    id:ObjectID

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    latitude:number

    @Column()
    longitude:number

    @Column()
    city:string

    @Column()
    uf:string

    @Column()
    likes:number

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}