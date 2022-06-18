import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsInt, IsNumberString, IsString, IsUUID, Min } from 'class-validator';

export class CreateClassDto {
    @IsString()
    public code: string;
    @IsString()
    public description: string;
    @IsString()
    public subjects: string;
    @IsNumberString()
    public price: string;
    @IsInt()
    @Min(1)
    public maxStudent: number;
    @IsDateString()
    public startDate: string;
    @IsDateString()
    public endDate: string;
    @IsUUID()
    public courseId: string;
    @IsUUID()
    public teacherId: string;
    @IsString()
    public name: string;
    @IsInt()
    @Min(1)
    public sessionNumber: number;
}
export class RegisterStudentDto {
    @IsUUID()
    public classId: string;
    @IsUUID()
    public studentId: string;
}
export class UpdateClassDto extends PartialType(CreateClassDto) {}
