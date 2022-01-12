import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./UserEntity";

@Entity('sessions')
export default class SessionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    token: string;

    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    user: UserEntity
}