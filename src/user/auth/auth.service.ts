import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountStatus, User, UserRole } from '@/user/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto, RegisterTeacherDto, UserTokenDto, TokenDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { Country, Student } from '@/student/entities/student.entity';
import { Teacher } from '@/teacher/entities/teacher.entity';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @InjectRepository(Student)
  private readonly studentRepository: Repository<Student>;

  @InjectRepository(Country)
  private readonly countryRepository: Repository<Country>;

  @InjectRepository(Teacher)
  private readonly teacherRepository: Repository<Teacher>;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<UserTokenDto | never> {
    const { email, password, countryId, dateBirth, firstName, lastName, middleName }: RegisterDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });
    let country
    try {
      country = await this.countryRepository.findOne({ where: { id: countryId } });
    } catch (error) {
      throw new HttpException('No Country Found', HttpStatus.BAD_REQUEST);
    }

    if (user) {
      throw new HttpException('Email Is Used', HttpStatus.CONFLICT);
    }

    let student: Student = new Student();
    student.country = country
    student.email = email
    student.dateBirth = dateBirth
    student.firstName = firstName
    student.lastName = lastName
    student.middleName = middleName
    let newStudent 
    try {
      newStudent = await this.studentRepository.save(student);
    } catch (error) {
      throw new HttpException('No Country Found', HttpStatus.BAD_REQUEST);
    }
    user = new User();
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.student = newStudent
    user.role= UserRole.STUDENT
    user.status= AccountStatus.PINDING

    let userToken:UserTokenDto = new UserTokenDto()
    userToken= await this.userRepository.save(user)
    userToken.token= this.helper.generateToken(user).token
    return userToken;
  }

  public async registerTeacher(body: RegisterTeacherDto): Promise<User | never> {
    const { email, password, firstName, gender, lastName, phone}: RegisterTeacherDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Email Is Used', HttpStatus.CONFLICT);
    }
    let teacher: Teacher = new Teacher();
     teacher.email= email
     teacher.firstName= firstName
     teacher.lastName= lastName
     teacher.gender= gender
     teacher.phone= phone
     let newTeacher 
     try {
      newTeacher = await this.teacherRepository.save(teacher);
     } catch (error) {
       throw new HttpException('No Country Found', HttpStatus.BAD_REQUEST);
     }
    user = new User();
    user.email = email;
    user.password = this.helper.encodePassword(password);
    user.teacher = newTeacher
    user.role= UserRole.TEACHER
    user.status= AccountStatus.ACTIVE
    return this.userRepository.save(user);
  }

  public async login(body: LoginDto): Promise<UserTokenDto | never> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOne({ where: { email },relations:['teacher','student'] });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }
    let userToken:UserTokenDto = new UserTokenDto()
    delete user.password
    userToken= user
    userToken.token= this.helper.generateToken(user).token
    return userToken;
  }

  public async refresh(user: User): Promise<TokenDto> {
    return this.helper.generateToken(user);
  }
}