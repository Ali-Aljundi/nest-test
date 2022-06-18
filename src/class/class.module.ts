import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Course } from '@/course/entities/course.entity';
import { Class } from './entities/class.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '@/student/entities/student.entity';

@Module({
  controllers: [ClassController],
  providers: [ClassService],
  imports: [
    TypeOrmModule.forFeature([Teacher,Class,Course,Student]),
  ]
})
export class ClassModule {}
