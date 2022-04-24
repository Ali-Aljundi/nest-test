import { Course } from 'src/course/entities/course.entity';
import { JitsiSession } from 'src/jitsi_session/entities/jitsi_session.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Class {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 200 })
  code: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  subjects: string;

  @Column('int')
  price: string;

  @Column('int', { nullable: true })
  discount: string;

  @Column('int')
  max_student: string;

  @Column('time')
  start_date: string;

  @Column('time')
  end_date: string;

  @Column('int')
  session_number: string;

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];

  @ManyToOne(() => Course, (course) => course.id)
  course_: Course;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  teacher_: Teacher;

  @OneToMany(() => Payment, (payment) => payment.class_)
  payment: Payment[];

  @OneToMany(() => Rating, (rating) => rating.class_)
  rating: Rating[];

  @OneToMany(() => Session_Date, (Session_Date) => Session_Date.class_)
  Session_Date: Session_Date[];

  @OneToMany(() => JitsiSession, (JitsiSession) => JitsiSession.class_)
  JitsiSession: JitsiSession[];
}

@Entity()
export class Session_Date {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('time')
  start_date: string;

  @Column('time')
  end_date: string;

  @ManyToOne(() => Class, (Class) => Class.id)
  class_: Class;
}
