import { JwtAuthGuard } from '@/user/auth/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateJitsiSessionDto, UpdateJitsiSessionDto } from './dto/jitsi-session.dto';
import { JitsiSessionService } from './jitsi_session.service';

@Controller('jitsi-session')
export class JitsiSessionController {
  constructor(private readonly jitsiSessionService: JitsiSessionService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
 // @UseGuards(JwtAuthGuard)
  create(@Body() createJitsiSessionDto: CreateJitsiSessionDto) {
    return this.jitsiSessionService.create(createJitsiSessionDto);
  }
  @Get('get-url/:classId')
  getUrl(@Param('classId') classId: string) {
    return this.jitsiSessionService.getUrl(classId);
  }

  @Get()
  findAll() {
    return this.jitsiSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jitsiSessionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJitsiSessionDto: UpdateJitsiSessionDto,
  ) {
    return this.jitsiSessionService.update(+id, updateJitsiSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jitsiSessionService.remove(+id);
  }
}
