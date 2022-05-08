import { Class } from 'src/class/entities/class.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Course {
  @CreateDateColumn()
  createdDate: Date;
  @UpdateDateColumn()
  updatedDate: Date;
  @DeleteDateColumn()
  deletedDate: Date;

   @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 200 })
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  image: string;

  @OneToMany(() => Class, (classs) => classs.course)
  classs: Class[];

  @OneToMany(() => Rating, (rating) => rating.course)
  rating: Rating[];
}
