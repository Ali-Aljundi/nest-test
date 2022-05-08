import { Teacher } from '@/teacher/entities/teacher.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { Course } from './entities/course.entity';


@Injectable()
export class CourseService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;

  public async create(body: CreateCourseDto): Promise<Course | never> {
    const {description,name}: CreateCourseDto = body;
    let course: Course = await this.courseRepository.findOne({ where: { name : name } });
    if (course) {
      throw new HttpException('Course Found Before', HttpStatus.CONFLICT);
    }
    course = new Course();
    course.name= name
    course.description= description
    return this.courseRepository.save(course)
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
