import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LessonModule } from './lesson/lesson.module';
import { HomeworkModule } from './homework/homework.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    ConfigModule.forRoot(),
    LessonModule,
    HomeworkModule,
    AuthModule,
  ],
})
export class AppModule {}
