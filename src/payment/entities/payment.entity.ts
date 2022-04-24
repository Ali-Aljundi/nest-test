import { Class } from 'src/class/entities/class.entity';
import { Student } from 'src/student/entities/student.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PaymentStatus {
  DONE = 1,
  PINDING = 2,
  FAILED = 3,
}

@Entity()
export class Payment_Method {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 200 })
  name: string;

  @OneToMany(() => Payment, (payment) => payment.payment_method_)
  payment: Payment[];
}

@Entity()
export class Payment {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('time')
  payment_date: string;

  @Column('int')
  amount: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PINDING })
  status: PaymentStatus;

  @Column('time')
  due_date: string;

  @ManyToOne(() => Payment_Method, (payment_method) => payment_method.id)
  payment_method_: Payment_Method;

  @ManyToOne(() => Class, (classs) => classs.id)
  class_: Class;

  @ManyToOne(() => Student, (student) => student.id)
  student_: Student;
}
