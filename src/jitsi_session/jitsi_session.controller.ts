import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JitsiSessionService } from './jitsi_session.service';
import { CreateJitsiSessionDto } from './dto/create-jitsi_session.dto';
import { UpdateJitsiSessionDto } from './dto/update-jitsi_session.dto';

@Controller('jitsi-session')
export class JitsiSessionController {
  constructor(private readonly jitsiSessionService: JitsiSessionService) {}

  @Post()
  create(@Body() createJitsiSessionDto: CreateJitsiSessionDto) {
    return this.jitsiSessionService.create(createJitsiSessionDto);
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
