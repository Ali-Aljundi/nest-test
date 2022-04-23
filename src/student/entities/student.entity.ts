import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity()
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('varchar')
    first_name: string
}
