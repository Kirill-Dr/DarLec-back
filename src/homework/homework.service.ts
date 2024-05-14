import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HomeworkModel } from './homework.model';
import { Model } from 'mongoose';
import { HomeworkDto } from './dto/homework.dto';

@Injectable()
export class HomeworkService {
  constructor(
    @InjectModel(HomeworkModel.name)
    private readonly homeworkModel: Model<HomeworkModel>,
  ) {}

  async createHomework(dto: HomeworkDto): Promise<HomeworkDto> {
    try {
      return this.homeworkModel.create(dto);
    } catch (error) {
      throw new Error('Не удалось создать домашнюю работу: ' + error);
    }
  }

  async findAllHomeworks(): Promise<HomeworkDto[]> {
    try {
      return this.homeworkModel.find().exec();
    } catch (error) {
      throw new Error('Не удалось найти домашнюю работу: ' + error);
    }
  }

  async deleteHomeworkById(homeworkId: string): Promise<HomeworkDto> {
    try {
      return this.homeworkModel.findByIdAndDelete(homeworkId);
    } catch (error) {
      throw new Error('Не удалось удалить домашнюю работу по id: ' + error);
    }
  }

  async updateHomeworkById(
    homeworkId: string,
    updatedHomework: HomeworkDto,
  ): Promise<HomeworkDto> {
    try {
      return this.homeworkModel.findByIdAndUpdate(homeworkId, updatedHomework, {
        new: true,
      });
    } catch (error) {
      throw new Error('Не удалось обновить домашнюю работу по id: ' + error);
    }
  }
}
