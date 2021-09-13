import { UserProfile } from './../../../../userProfile/infra/typeorm/schemas/UserProfile';
import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, OneToOne, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class Users{

    @ObjectIdColumn()
    id:ObjectID

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    country:string
    
    @Column()
    @Exclude()
    password:string

    @OneToOne(type => UserProfile, userProfile => userProfile.user,{eager:true})
    profile:UserProfile

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}