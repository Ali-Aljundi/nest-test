import { PartialType } from '@nestjs/mapped-types';
import { CreateJitsiSessionDto } from './create-jitsi_session.dto';

export class UpdateJitsiSessionDto extends PartialType(CreateJitsiSessionDto) {}
