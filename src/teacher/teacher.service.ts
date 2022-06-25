import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  @InjectRepository(Teacher)
  private readonly teacherRepository: Repository<Teacher>;

  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }

 
  public async findAll(): Promise<Teacher[] | never>  {
      return  this.teacherRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
