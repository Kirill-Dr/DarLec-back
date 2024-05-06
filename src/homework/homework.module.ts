import { Module } from '@nestjs/common';
import { HomeworkService } from './homework.service';
import { HomeworkController } from './homework.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HomeworkModel, HomeworkSchema } from './homework.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HomeworkModel.name, schema: HomeworkSchema },
    ]),
  ],
  providers: [HomeworkService],
  controllers: [HomeworkController],
})
export class HomeworkModule {}
