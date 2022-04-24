import { Test, TestingModule } from '@nestjs/testing';
import { JitsiSessionController } from './jitsi_session.controller';
import { JitsiSessionService } from './jitsi_session.service';

describe('JitsiSessionController', () => {
  let controller: JitsiSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JitsiSessionController],
      providers: [JitsiSessionService],
    }).compile();

    controller = module.get<JitsiSessionController>(JitsiSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
