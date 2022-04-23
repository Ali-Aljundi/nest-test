import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
@Module({
  imports: [
   ConfigModule.forRoot(),
   UserModule,
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      },
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }),
    TeacherModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule{

  }
