import { Course } from '@/course/entities/course.entity';
import { Student } from '@/student/entities/student.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto, RegisterStudentDto, UpdateClassDto } from './dto/class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;
  @InjectRepository(Class)
  private readonly classRepository: Repository<Class>;
  @InjectRepository(Teacher)
  private readonly teacherRepository: Repository<Teacher>;
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  public async create(body: CreateClassDto): Promise<Class | never> {
    const { description, name, code, courseId, endDate, maxStudent, price, startDate, subjects, teacherId, sessionNumber }: CreateClassDto = body;
    let Classs: Class = await this.classRepository.findOne({ where: { code: code } });
    if (Classs) {
      throw new HttpException('Class Found Before', HttpStatus.CONFLICT);
    }
    let teacher: Teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
    if (!teacher) {
      throw new HttpException('Wrong Teacher Id', HttpStatus.CONFLICT);
    }
    let cousre: Course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!cousre) {
      throw new HttpException('Wrong Cousre Id', HttpStatus.CONFLICT);
    }
    Classs = new Class();
    Classs.code = code
    Classs.description = description
    Classs.name = name
    Classs.endDate = endDate
    Classs.maxStudent = maxStudent
    Classs.price = price
    Classs.startDate = startDate
    Classs.subjects = subjects
    Classs.course = cousre
    Classs.teacher = teacher
    Classs.sessionNumber = sessionNumber
    return this.classRepository.save(Classs)
  }
  public async registerNewStudent(body: RegisterStudentDto): Promise<any | never> {
    const { classId,studentId}: RegisterStudentDto = body;
    let Classs: Class = await this.classRepository.findOne({ where: { id: classId },relations:['students'] });
    if (!Classs) {
      throw new HttpException('Wrong Class Id', HttpStatus.CONFLICT);
    }
    let student: Student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new HttpException('Wrong Student Id', HttpStatus.CONFLICT);
    }
    if (Classs.students.find(el=>el.id == student.id)) {
      throw new HttpException('Student Already Registered', HttpStatus.CONFLICT);
    }
    Classs.students=[...Classs.students,student]
    try {
      await this.classRepository.save(Classs)
    } catch (error) {
      throw new HttpException(error, HttpStatus.CONFLICT);
    }
    return {messsage :'Registered Successfully'}
  }

  
  public async findAllByQuery(teacherId?: string, courseId?: string): Promise<Class[] | never> {
    let teacher: Teacher
    let course: Course
    let query = {}
    if (teacherId) {
      teacher = await this.teacherRepository.findOne({ where: { id: teacherId } });
      if (!teacher) {
        throw new HttpException('Wrong Teacher Id', HttpStatus.CONFLICT);
      }
      query['teacher'] = teacher
    }
    if (courseId) {
      course = await this.courseRepository.findOne({ where: { id: courseId } });
      if (!course) {
        throw new HttpException('Wrong Course Id', HttpStatus.CONFLICT);
      }
      query['course'] = course
    }
    let Classs: Class[] = await this.classRepository.find({ where: query, relations: ['course', 'teacher'] });
    return Classs
  }

  public async findAllByStudent(studentId?: string): Promise<Class[] | never> {
    let student = await this.studentRepository.findOne({ where: { id: studentId } });
    if (!student) {
      throw new HttpException('Wrong Student Id', HttpStatus.CONFLICT);
    }
    let Classs: Class[] = await this.classRepository.find({ relations: ['course', 'teacher', 'students'] });
    Classs = Classs.filter(el => el.students.map(el => el.id).includes(student.id))
    Classs.forEach(el=>{
      delete el.students
    })
    return Classs
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
