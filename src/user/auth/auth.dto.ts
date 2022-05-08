import { GenderEnum } from '@/teacher/entities/teacher.entity';
import { Trim } from 'class-sanitizer';
import {IsDateString, IsEmail, IsEnum, IsMobilePhone, IsString, IsUUID, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';

export class RegisterDto {
  @IsString()
  public readonly firstName: string;
  @IsString()
  public readonly lastName: string;
  @IsString()
  public readonly middleName: string;
  @IsDateString()
  public readonly dateBirth: string;
  @IsUUID()
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
  @IsEmail()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}
 
export class TokenDto{
  @IsString()
  public readonly token: string;
}
export class UserTokenDto extends User{
  @IsString()
  public token?: string;
}