import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('pokemon')
export default class PokemonEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}