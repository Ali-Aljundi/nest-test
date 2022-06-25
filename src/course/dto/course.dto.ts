import { PartialType } from '@nestjs/mapped-types';
import { IsString,IsOptional
 } from 'class-validator';
 
export class CreateCourseDto {
    @IsString()
    public name: string;
    @IsString()
    public description: string;
    
    @IsOptional()
    @IsString()
    public extraDescription?: string;
}
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
