import { Module } from '@nestjs/common';
import { JitsiSessionService } from './jitsi_session.service';
import { JitsiSessionController } from './jitsi_session.controller';

@Module({
  controllers: [JitsiSessionController],
  providers: [JitsiSessionService],
})
export class JitsiSessionModule {}
