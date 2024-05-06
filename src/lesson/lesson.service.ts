import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LessonModel } from './lesson.model';
import { HydratedDocument, Model } from 'mongoose';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(LessonModel.name)
    private readonly lessonModel: Model<LessonModel>,
  ) {}

  async createLesson(
    dto: CreateLessonDto,
  ): Promise<HydratedDocument<LessonModel>> {
    try {
      return this.lessonModel.create(dto);
    } catch (error) {
      throw new Error('Could not create lesson: ' + error);
    }
  }

  async findAllLessons(): Promise<HydratedDocument<LessonModel>[]> {
    try {
      return this.lessonModel.find().exec();
    } catch (error) {
      throw new Error('Could not find all lessons: ' + error);
    }
  }

  async deleteLessonById(
    lessonId: string,
  ): Promise<HydratedDocument<LessonModel>> {
    try {
      return this.lessonModel.findByIdAndDelete(lessonId);
    } catch (error) {
      throw new Error('Could not delete lesson by id: ' + error);
    }
  }

  async updateLessonById(
    lessonId: string,
    updatedLesson: LessonModel,
  ): Promise<HydratedDocument<LessonModel>> {
    try {
      return this.lessonModel.findByIdAndUpdate(lessonId, updatedLesson, {
        new: true,
      });
    } catch (error) {
      throw new Error('Could not update lesson by id: ' + error);
    }
  }
}
