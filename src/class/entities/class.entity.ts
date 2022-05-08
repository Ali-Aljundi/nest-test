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
  id: string;

  @Column('varchar', { length: 200 })
  code: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  subjects: string;

  @Column('varchar')
  price: string;

  @Column('int', { nullable: true })
  discount: string;

  @Column('int')
  maxStudent: number;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @Column('int')
  sessionNumber: number;

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];

  @ManyToOne(() => Course, (course) => course.id)
  course: Course;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  teacher: Teacher;

  @OneToMany(() => Payment, (payment) => payment.class)
  payment: Payment[];

  @OneToMany(() => Rating, (rating) => rating.class)
  rating: Rating[];

  @OneToMany(() => Session_Date, (Session_Date) => Session_Date.class)
  SessionDate: Session_Date[];

  @OneToMany(() => JitsiSession, (JitsiSession) => JitsiSession.class)
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
  id: string;

  @Column('date')
  startDate: string;

  @Column('date')
  endDate: string;

  @ManyToOne(() => Class, (Class) => Class.id)
  class: Class;
}
