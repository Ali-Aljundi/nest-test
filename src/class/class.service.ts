import { Course } from '@/course/entities/course.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto, UpdateClassDto } from './dto/class.dto';
import { Class } from './entities/class.entity';
  
@Injectable()
export class ClassService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;
  @InjectRepository(Class)
  private readonly classRepository: Repository<Class>;
  @InjectRepository(Teacher)
  private readonly teacherRepository: Repository<Teacher>;

  public async create(body: CreateClassDto): Promise<Class | never> {
    const {description,name,code,courseId,endDate,maxStudent,price,startDate,subjects,teacherId, sessionNumber}: CreateClassDto = body;
    let Classs: Class = await this.classRepository.findOne({ where: { code : code } });
    if (Classs) {
      throw new HttpException('Class Found Before', HttpStatus.CONFLICT);
    }
    let teacher: Teacher = await this.teacherRepository.findOne({ where: { id : teacherId } });
    if (!teacher) {
      throw new HttpException('Wrong Teacher Id', HttpStatus.CONFLICT);
    }
    let cousre: Course = await this.courseRepository.findOne({ where: { id : courseId } });
    if (!cousre) {
      throw new HttpException('Wrong Cousre Id', HttpStatus.CONFLICT);
    }
    Classs = new Class();
    Classs.code= code
    Classs.description= description
    Classs.name= name
    Classs.endDate= endDate
    Classs.maxStudent= maxStudent
    Classs.price= price
    Classs.startDate= startDate
    Classs.subjects= subjects
    Classs.course= cousre
    Classs.teacher= teacher
    Classs.sessionNumber= sessionNumber
    return this.classRepository.save(Classs)
  }

  findAll() {
    return `This action returns all class`;
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return `This action updates a #${id} class`;
  }

  remove(id: number) {
    return `This action removes a #${id} class`;
  }
}
