import { Class } from 'src/class/entities/class.entity';
import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';
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
export class Rating {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

   @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  rating: string;

  @ManyToOne(() => Course, (course) => course.id)
  course: Course;

  @ManyToOne(() => Class, (Class) => Class.id)
  class: Class;

  @ManyToOne(() => Student, (student) => student.id)
  student: Student;
}
