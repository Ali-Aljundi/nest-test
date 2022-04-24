import { Class } from 'src/class/entities/class.entity';
import { Payment } from 'src/payment/entities/payment.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
@Entity()
export class Country {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => Student, (student) => student.country)
  student: Student[];
}
@Entity()
export class Student {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 200 })
  firstName: string;

  @Column('varchar', { length: 200 })
  lastName: string;

  @Column('varchar', { length: 200 })
  middleName: string;

  @Column('date')
  dateBirth: string;

  @ManyToOne(() => Country, (country) => country.id)
  country: Country;

  @Column('varchar', { length: 200 })
  phone: string;

  @Column('varchar', { length: 200 })
  email: string;

  @ManyToMany(() => Class, (Class) => Class.students)
  Classes: Class[];

  @OneToMany(() => Payment, (payment) => payment.student)
  payment: Payment[];

  @OneToMany(() => Rating, (rating) => rating.student)
  rating: Rating[];
}
