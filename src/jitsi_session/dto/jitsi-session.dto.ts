import { Student } from '@/student/entities/student.entity';
import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID } from 'class-validator';
import { JitsiSession } from '../entities/jitsi_session.entity';

 export class CreateJitsiSessionDto {
    @IsUUID()
    public classId: string;
    @IsUUID()
    public teacherId: string;
    @IsString()
    public password: string;
    @IsString()
    public roomName: string;
 }

export class UpdateJitsiSessionDto extends PartialType(CreateJitsiSessionDto) {}
export class JitsiSessionUrlDto {
   @IsString()
   public roomName: string;
}
export class JitsiSessionInfoDto extends PartialType(JitsiSession) {
    public students:Student[];
}
