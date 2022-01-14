import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Trainer from "../services/protocols/Trainer";

@Entity('trainers')
export default class TrainerEntity implements Trainer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}