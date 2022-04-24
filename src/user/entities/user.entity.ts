import { Student } from 'src/student/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 1,
  TEACHER = 2,
  STUDENT = 3,
}

export enum AccountStatus {
  ACTIVE = 1,
  PINDING = 2,
  DELETED = 3,
}

@Entity({ name: 'user' })
export class User {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 200 })
  email: string;

  @Column('varchar', { length: 200 })
  password: string;

  @Column({ type: 'enum', enum: AccountStatus, default: AccountStatus.PINDING })
  status: AccountStatus;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher_: Teacher;

  @OneToOne(() => Student)
  @JoinColumn()
  student_: Student;
}