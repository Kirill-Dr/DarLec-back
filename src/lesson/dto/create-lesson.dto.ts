import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonDto {
  @IsString()
  @ApiProperty()
  day: string;

  @IsString()
  @ApiProperty()
  subject: string;

  @IsString()
  @ApiProperty()
  timeStart: string;

  @IsString()
  @ApiProperty()
  timeEnd: string;

  @IsString()
  @ApiProperty()
  teacher: string;

  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @ApiProperty()
  room: string;
}
