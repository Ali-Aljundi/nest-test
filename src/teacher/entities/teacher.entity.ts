import { Class } from 'src/class/entities/class.entity';
import { JitsiSession } from 'src/jitsi_session/entities/jitsi_session.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum GenderEnum {
    MALE = 1,
    FEMALE = 2,
}

@Entity()
export class Teacher {
    @CreateDateColumn()
    createdDate: Date;
    @UpdateDateColumn()
    updatedDate: Date;
    @DeleteDateColumn()
    deletedDate: Date;

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('varchar', { length: 200 })
    first_name: string;

    @Column('varchar', { length: 200 })
    last_name: string;

    @Column('varchar', { length: 200 })
    phone: string;

    @Column('varchar', { length: 200 })
    email: string;

    @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.MALE })
    gender: GenderEnum;

    @OneToMany(() => Class, (classs) => classs.teacher_)
    class: Class[];

    @OneToMany(() => JitsiSession, (JitsiSession) => JitsiSession.teacher_)
    JitsiSession: JitsiSession[];
}
