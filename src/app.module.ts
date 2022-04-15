import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramService } from './telegram/telegram.service';
@Module({
  imports: [
   ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   url: process.env.DATABASE_URL,
    //   type: 'postgres',
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    //   entities: ['dist/**/*.entity{.ts,.js}'],
    //   synchronize: true, // This for development
    //   autoLoadEntities: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, TelegramService],
})
export class AppModule{

  }
