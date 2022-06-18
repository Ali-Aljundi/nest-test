import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto, RegisterStudentDto, UpdateClassDto } from './dto/class.dto';
  
@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Get('/')
  findAllByQuery(@Query('teacherId') teacherId: string,@Query('courseId') courseId: string) {
    return this.classService.findAllByQuery(teacherId,courseId);
  }

  @Get('/student')
  findAllByStudent(@Query('studentId') studentId: string) {
    return this.classService.findAllByStudent(studentId);
  }

  @Post('/register')
  @UseInterceptors(ClassSerializerInterceptor)
  registerNewStudent(@Body() registerStudentDto: RegisterStudentDto){
    return this.classService.registerNewStudent(registerStudentDto);
  }
  // @Get('/')
  // findAll(){
  //   return this.classService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
    return this.classService.update(+id, updateClassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classService.remove(+id);
  }
}
