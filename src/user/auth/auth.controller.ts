
import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from '@/user/entities/user.entity';
import { RegisterDto, LoginDto, RegisterTeacherDto, TokenDto, UserTokenDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { sanitize } from 'class-sanitizer';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<UserTokenDto | never> {
    return this.service.register(body);
  }

  @Post('register/teacher')
  @UseInterceptors(ClassSerializerInterceptor)
  private registerTeacher(@Body() body: RegisterTeacherDto): Promise<User | never> {
    return this.service.registerTeacher(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<UserTokenDto | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<TokenDto | never> {
    return this.service.refresh(<User>user);
  }
}