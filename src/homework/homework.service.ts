import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HomeworkModel } from './homework.model';
import { HydratedDocument, Model } from 'mongoose';
import { CreateHomeworkDto } from './dto/create-homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectModel(HomeworkModel.name)
    private readonly homeworkModel: Model<HomeworkModel>,
  ) {}

  async createHomework(
    dto: CreateHomeworkDto,
  ): Promise<HydratedDocument<HomeworkModel>> {
    try {
      return this.homeworkModel.create(dto);
    } catch (error) {
      throw new Error('Could not create homework: ' + error);
    }
  }

  async findAllHomeworks(): Promise<HydratedDocument<HomeworkModel>[]> {
    try {
      return this.homeworkModel.find().exec();
    } catch (error) {
      throw new Error('Could not find all homeworks: ' + error);
    }
  }

  async deleteHomeworkById(
    homeworkId: string,
  ): Promise<HydratedDocument<HomeworkModel>> {
    try {
      return this.homeworkModel.findByIdAndDelete(homeworkId);
    } catch (error) {
      throw new Error('Could not delete homework by id: ' + error);
    }
  }

  async updateHomeworkById(
    homeworkId: string,
    updatedHomework: HomeworkModel,
  ): Promise<HydratedDocument<HomeworkModel>> {
    try {
      return this.homeworkModel.findByIdAndUpdate(homeworkId, updatedHomework, {
        new: true,
      });
    } catch (error) {
      throw new Error('Could not update homework by id: ' + error);
    }
  }
}
