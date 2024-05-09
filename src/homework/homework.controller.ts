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
import { HomeworkDto } from './dto/homework.dto';

@Controller('homework')
@ApiTags('Homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  async createHomework(
    @Body() createHomeworkDto: HomeworkDto,
  ): Promise<HomeworkDto> {
    return this.homeworkService.createHomework(createHomeworkDto);
  }

  @Get()
  async findAllHomeworks(): Promise<HomeworkDto[]> {
    return this.homeworkService.findAllHomeworks();
  }

  @Delete(':homeworkId')
  async deleteHomeworkById(
    @Param('homeworkId') homeworkId: string,
  ): Promise<HomeworkDto> {
    return this.homeworkService.deleteHomeworkById(homeworkId);
  }

  @Patch(':homeworkId')
  async updateHomeworkById(
    @Param('homeworkId') homeworkId: string,
    @Body() updatedHomework: HomeworkDto,
  ): Promise<HomeworkDto> {
    return this.homeworkService.updateHomeworkById(homeworkId, updatedHomework);
  }
}
