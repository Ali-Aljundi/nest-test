import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateCourseDto {
    @IsString()
    public name: string;
    @IsString()
    public description: string;
}
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
