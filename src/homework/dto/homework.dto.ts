import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HomeworkDto {
  @IsString()
  @ApiProperty()
  subject: string;

  @IsString()
  @ApiProperty()
  task: string;
}
