import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<LessonModel>;

@Schema({ timestamps: true, collection: 'lessons' })
export class LessonModel {
  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  timeStart: string;

  @Prop({ required: true })
  timeEnd: string;

  @Prop({ required: true })
  teacher: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  room: string;
}

export const LessonSchema = SchemaFactory.createForClass(LessonModel);
