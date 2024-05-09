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
import { LessonDto } from './dto/lesson.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('lesson')
@ApiTags('Schedule')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  async createLesson(@Body() createLessonDto: LessonDto): Promise<LessonDto> {
    return await this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  async findAllLessons(): Promise<LessonDto[]> {
    return this.lessonService.findAllLessons();
  }

  @Delete(':lessonId')
  async deleteLessonById(
    @Param('lessonId') lessonId: string,
  ): Promise<LessonDto> {
    return this.lessonService.deleteLessonById(lessonId);
  }

  @Patch(':lessonId')
  async updateLessonById(
    @Param('lessonId') lessonId: string,
    @Body() updatedLesson: LessonDto,
  ): Promise<LessonDto> {
    return this.lessonService.updateLessonById(lessonId, updatedLesson);
  }
}
