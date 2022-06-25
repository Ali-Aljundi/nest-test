import { Class } from '@/class/entities/class.entity';
import { Student } from '@/student/entities/student.entity';
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
  @InjectRepository(Teacher)
  private readonly teacherRepository: Repository<Teacher>;
  @InjectRepository(Class)
  private readonly classRepository: Repository<Class>;
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  public async create(body: CreateCourseDto): Promise<Course | never> {
    const {description,name,extraDescription}: CreateCourseDto = body;
    let course: Course = await this.courseRepository.findOne({ where: { name : name } });
    if (course) {
      throw new HttpException('Course Found Before', HttpStatus.CONFLICT);
    }
    course = new Course();
    course.name= name
    course.description= description
    course.extraDescription= extraDescription
    return this.courseRepository.save(course)
  }

  public async findAll(teacherId?:string,studentId?:string): Promise<any[] | never>  {
    if (teacherId) {
      let teacher: Teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
      if (!teacher) {
        throw new HttpException('Wrong Teacher Id', HttpStatus.CONFLICT);
      }
      let classs: Class[] = await this.classRepository.find({ where: { teacher: teacher },relations:['course'] });
      let courses = classs.map(el=>el.course)
      courses = courses.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
      return courses
    }
    if (studentId) {
      let student: Student = await this.studentRepository.findOne({ where: { id: studentId } });
      if (!student) {
        throw new HttpException('Wrong Student Id', HttpStatus.CONFLICT);
      }
      let classs: Class[] = await this.classRepository.find({relations:['students','course'] });
      classs = classs.filter(el=>el.students.map(el=>el.id).includes(student.id))
      let courses = classs.map(el=>el.course)
      courses = courses.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i)
      return courses
    }
      let courses = await this.courseRepository.find()
      return courses
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
