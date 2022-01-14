import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Pokemon from "../services/protocols/Pokemon";

@Entity('pokemon')
export default class PokemonEntity implements Pokemon {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}