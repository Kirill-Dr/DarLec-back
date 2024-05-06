import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LessonDocument = HydratedDocument<LessonModel>;

@Schema({ timestamps: true, collection: 'lessons' })
export class LessonModel {
  @Prop({ required: true })
  @ApiProperty()
  day: string;

  @Prop({ required: true })
  @ApiProperty()
  subject: string;

  @Prop({ required: true })
  @ApiProperty()
  timeStart: string;

  @Prop({ required: true })
  @ApiProperty()
  timeEnd: string;

  @Prop({ required: true })
  @ApiProperty()
  teacher: string;

  @Prop({ required: true })
  @ApiProperty()
  type: string;

  @Prop({ required: true })
  @ApiProperty()
  room: string;
}

export const LessonSchema = SchemaFactory.createForClass(LessonModel);
