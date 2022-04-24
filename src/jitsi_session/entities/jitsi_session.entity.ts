import { Class } from 'src/class/entities/class.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JitsiSession {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  url: string;

  @Column('varchar')
  password: string;

  @ManyToOne(() => Class, (classs) => classs.id)
  class: Class;

  @ManyToOne(() => Teacher, (student) => student.id)
  teacher: Teacher;
}
