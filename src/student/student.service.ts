import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all student`;
  }

 async findOne(id: string) : Promise<Student | never> {
    return this.studentRepository.findOne({where:{id:id},relations:['country']});
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
