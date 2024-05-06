import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HomeworkService } from './homework.service';
import { CreateHomeworkDto } from './dto/create-homework.dto';

@Controller('homework')
@ApiTags('Homework')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  async createHomework(@Body() createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkService.createHomework(createHomeworkDto);
  }
}
