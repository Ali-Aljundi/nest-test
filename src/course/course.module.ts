import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { Class } from '@/class/entities/class.entity';
import { Student } from '@/student/entities/student.entity';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [
    TypeOrmModule.forFeature([Course,Class,Teacher,Student]),
  ]
})
export class CourseModule {}
