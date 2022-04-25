import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
import { UserModule } from './user/user.module';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';
import { CourseModule } from './course/course.module';
import { ClassModule } from './class/class.module';
import { PaymentModule } from './payment/payment.module';
import { RatingModule } from './rating/rating.module';
import { JitsiSessionModule } from './jitsi_session/jitsi_session.module';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    UserModule,
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TeacherModule,
    StudentModule,
    CourseModule,
    ClassModule,
    PaymentModule,
    RatingModule,
    JitsiSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule {}
