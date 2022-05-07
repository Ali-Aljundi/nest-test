import { GenderEnum } from '@/teacher/entities/teacher.entity';
import { Trim } from 'class-sanitizer';
import {IsDateString, IsEmail, IsEnum, IsMobilePhone, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  public readonly firstName: string;
  @IsString()
  public readonly lastName: string;
  @IsString()
  public readonly middleName: string;
  @IsDateString()
  public readonly dateBirth: string;
  @IsString()
  public readonly countryId: string;

  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}

export class RegisterTeacherDto {
  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsMobilePhone("any")
  phone: string
  
  @IsEnum(GenderEnum)
  gender: GenderEnum
  
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

