import { Users } from '@modules/users/infra/typeorm/schemas/User';
import { Column, CreateDateColumn, Entity, JoinColumn, ObjectID, ObjectIdColumn, OneToOne, UpdateDateColumn } from 'typeorm'

@Entity('user_profile')
export class UserProfile{

    @ObjectIdColumn()
    id:ObjectID
    
    @OneToOne(type=> Users,users => users.profile)
    @JoinColumn({name:'user_id'})
    user:Users

    @Column()
    user_id:string

    @Column({nullable:true})
    image:string

    @Column()
    description:string
    
    @Column()
    stance:"goofy"|"regular"

    @Column()
    favorite_brands:string
    
    @Column()
    favorite_spots:string

    @CreateDateColumn()
    created_at:Date

    @UpdateDateColumn()
    updated_at:Date

}