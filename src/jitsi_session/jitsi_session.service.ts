import { Class } from '@/class/entities/class.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJitsiSessionDto, JitsiSessionUrlDto, UpdateJitsiSessionDto } from './dto/jitsi-session.dto';
import { JitsiSession } from './entities/jitsi_session.entity';
  
@Injectable()
export class JitsiSessionService {
  @InjectRepository(JitsiSession)
  private readonly jitsiRepository: Repository<JitsiSession>;

  @InjectRepository(Class)
  private readonly classRepository: Repository<Class>;

  @InjectRepository(Teacher)
  private readonly teacherRepository: Repository<Teacher>;

  public async create(body: CreateJitsiSessionDto): Promise<JitsiSession | never> {
    const {password,classId,teacherId,url }: CreateJitsiSessionDto = body;
    let teacher: Teacher = await this.teacherRepository.findOne({ where: { id : teacherId } });
    if (!teacher) {
      throw new HttpException('Wrong Teacher Id', HttpStatus.CONFLICT);
    }
    let Class: Class = await this.classRepository.findOne({ where: { id : classId },relations:['teacher']});
    if (!Class) {
      throw new HttpException('Wrong Class Id', HttpStatus.CONFLICT);
    }
    if (Class.teacher && Class.teacher?.id != teacherId) {
      throw new HttpException('This Teacher Dont Give This Class', HttpStatus.CONFLICT);
    }
    let session: JitsiSession = new JitsiSession();
    delete Class.teacher
    session.class= Class
    session.teacher= teacher
    session.url= url
    session.password= password

    return this.jitsiRepository.save(session)
  }
  public async getUrl(classId: string): Promise<JitsiSessionUrlDto | never> {
    let Class: Class = await this.classRepository.findOne({ where: { id : classId }});
    if (!Class) {
      throw new HttpException('Wrong Class Id', HttpStatus.CONFLICT);
    }
    let session: JitsiSession = await this.jitsiRepository.findOne({ where: { class : Class},order:{createdDate:'DESC'} });
    let sessionUrl: JitsiSessionUrlDto = new JitsiSessionUrlDto()
    sessionUrl.url = session.url
    return sessionUrl
  }

  findAll() {
    return `This action returns all jitsiSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jitsiSession`;
  }

  update(id: number, updateJitsiSessionDto: UpdateJitsiSessionDto) {
    return `This action updates a #${id} jitsiSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} jitsiSession`;
  }
}
