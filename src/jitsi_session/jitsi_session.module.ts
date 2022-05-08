import { Module } from '@nestjs/common';
import { JitsiSessionService } from './jitsi_session.service';
import { JitsiSessionController } from './jitsi_session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '@/teacher/entities/teacher.entity';
import { Class } from '@/class/entities/class.entity';
import { JitsiSession } from './entities/jitsi_session.entity';

@Module({
  controllers: [JitsiSessionController],
  providers: [JitsiSessionService],
  imports: [
    TypeOrmModule.forFeature([JitsiSession, Teacher, Class]),
  ]
})
export class JitsiSessionModule {}
