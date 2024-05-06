import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHomeworkDto {
  @IsString()
  @ApiProperty()
  subject: string;

  @IsString()
  @ApiProperty()
  task: string;

  @IsString()
  @ApiProperty()
  date: string;
}
