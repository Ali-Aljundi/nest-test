import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn('uuid')
    id: number;
}
