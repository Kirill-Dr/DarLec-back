import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonDto } from './dto/lesson.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { Role } from '../auth/role.decorator';
import { RoleEnum } from '../auth/role.enum';

@Controller('lesson')
@ApiTags('Schedule')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth('JWT')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Role(RoleEnum.Admin)
  async createLesson(@Body() createLessonDto: LessonDto): Promise<LessonDto> {
    return await this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  @Role(RoleEnum.Admin, RoleEnum.User)
  async findAllLessons(): Promise<LessonDto[]> {
    return this.lessonService.findAllLessons();
  }

  @Delete(':lessonId')
  @Role(RoleEnum.Admin)
  async deleteLessonById(
    @Param('lessonId') lessonId: string,
  ): Promise<LessonDto> {
    return this.lessonService.deleteLessonById(lessonId);
  }

  @Patch(':lessonId')
  @Role(RoleEnum.Admin)
  async updateLessonById(
    @Param('lessonId') lessonId: string,
    @Body() updatedLesson: LessonDto,
  ): Promise<LessonDto> {
    return this.lessonService.updateLessonById(lessonId, updatedLesson);
  }
}
