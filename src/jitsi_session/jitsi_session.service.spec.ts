import { Test, TestingModule } from '@nestjs/testing';
import { JitsiSessionService } from './jitsi_session.service';

describe('JitsiSessionService', () => {
  let service: JitsiSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JitsiSessionService],
    }).compile();

    service = module.get<JitsiSessionService>(JitsiSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
