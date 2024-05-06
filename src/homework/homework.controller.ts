import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';
import { HomeworkModel } from './homework.model';

@Controller('homework')
@ApiTags('Homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  async createHomework(
    @Body() createHomeworkDto: CreateHomeworkDto,
  ): Promise<HomeworkModel> {
    return this.homeworkService.createHomework(createHomeworkDto);
  }

  @Get()
  async findAllHomeworks(): Promise<HomeworkModel[]> {
    return this.homeworkService.findAllHomeworks();
  }

  @Delete(':homeworkId')
  async deleteHomeworkById(
    @Param('homeworkId') homeworkId: string,
  ): Promise<HomeworkModel> {
    return this.homeworkService.deleteHomeworkById(homeworkId);
  }

  @Patch(':homeworkId')
  async updateHomeworkById(
    @Param('homeworkId') homeworkId: string,
    @Body() updatedHomework: HomeworkModel,
  ): Promise<HomeworkModel> {
    return this.homeworkService.updateHomeworkById(homeworkId, updatedHomework);
  }
}
