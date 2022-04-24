import { Injectable } from '@nestjs/common';
import { CreateJitsiSessionDto } from './dto/create-jitsi_session.dto';
import { UpdateJitsiSessionDto } from './dto/update-jitsi_session.dto';

@Injectable()
export class JitsiSessionService {
  create(createJitsiSessionDto: CreateJitsiSessionDto) {
    return 'This action adds a new jitsiSession';
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
