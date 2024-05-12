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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HomeworkService } from './homework.service';
import { HomeworkDto } from './dto/homework.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Role } from '../auth/role.decorator';
import { RoleEnum } from '../auth/role.enum';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller('homework')
@ApiTags('Homework')
@UseGuards(JwtAuthGuard, RoleGuard)
@ApiBearerAuth('JWT')
export class HomeworkController {
  constructor(private readonly homeworkService: HomeworkService) {}

  @Post()
  @Role(RoleEnum.Admin)
  async createHomework(
    @Body() createHomeworkDto: HomeworkDto,
  ): Promise<HomeworkDto> {
    return this.homeworkService.createHomework(createHomeworkDto);
  }

  @Get()
  @Role(RoleEnum.Admin, RoleEnum.User)
  async findAllHomeworks(): Promise<HomeworkDto[]> {
    return this.homeworkService.findAllHomeworks();
  }

  @Delete(':homeworkId')
  @Role(RoleEnum.Admin)
  async deleteHomeworkById(
    @Param('homeworkId') homeworkId: string,
  ): Promise<HomeworkDto> {
    return this.homeworkService.deleteHomeworkById(homeworkId);
  }

  @Patch(':homeworkId')
  @Role(RoleEnum.Admin)
  async updateHomeworkById(
    @Param('homeworkId') homeworkId: string,
    @Body() updatedHomework: HomeworkDto,
  ): Promise<HomeworkDto> {
    return this.homeworkService.updateHomeworkById(homeworkId, updatedHomework);
  }
}
