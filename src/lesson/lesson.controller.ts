import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonModel } from './lesson.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('lesson')
@ApiTags('Schedule')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async createLesson(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<LessonModel> {
    return await this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  async findAllLessons(): Promise<LessonModel[]> {
    return this.lessonService.findAllLessons();
  }

  @Delete(':lessonId')
  async deleteLessonById(
    @Param('lessonId') lessonId: string,
  ): Promise<LessonModel> {
    return this.lessonService.deleteLessonById(lessonId);
  }

  @Patch(':lessonId')
  async updateLessonById(
    @Param('lessonId') lessonId: string,
    @Body() updatedLesson: LessonModel,
  ): Promise<LessonModel> {
    return this.lessonService.updateLessonById(lessonId, updatedLesson);
  }
}
