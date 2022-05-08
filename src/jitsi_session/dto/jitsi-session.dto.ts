import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsUUID } from 'class-validator';

 export class CreateJitsiSessionDto {
    @IsUUID()
    public classId: string;
    @IsUUID()
    public teacherId: string;
    @IsString()
    public password: string;
    @IsString()
    public url: string;
 }

export class UpdateJitsiSessionDto extends PartialType(CreateJitsiSessionDto) {}
export class JitsiSessionUrlDto {
   @IsString()
   public url: string;
}

