import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LessonModel } from './lesson.model';
import { Model } from 'mongoose';
import { LessonDto } from './dto/lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(LessonModel.name)
    private readonly lessonModel: Model<LessonModel>,
  ) {}

  async createLesson(dto: LessonDto): Promise<LessonDto> {
    try {
      return this.lessonModel.create(dto);
    } catch (error) {
      throw new Error('Не удалось создать урок: ' + error);
    }
  }

  async findAllLessons(): Promise<LessonDto[]> {
    try {
      return this.lessonModel.find().exec();
    } catch (error) {
      throw new Error('Не удалось найти уроки: ' + error);
    }
  }

  async deleteLessonById(lessonId: string): Promise<LessonDto> {
    try {
      return this.lessonModel.findByIdAndDelete(lessonId);
    } catch (error) {
      throw new Error('Не удалось удалить урок по id: ' + error);
    }
  }

  async updateLessonById(
    lessonId: string,
    updatedLesson: LessonDto,
  ): Promise<LessonDto> {
    try {
      return this.lessonModel.findByIdAndUpdate(lessonId, updatedLesson, {
        new: true,
      });
    } catch (error) {
      throw new Error('Не удалось обновить урок по id: ' + error);
    }
  }
}
