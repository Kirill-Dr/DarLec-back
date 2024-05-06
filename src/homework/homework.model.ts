import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type HomeworkDocument = HydratedDocument<HomeworkModel>;

@Schema({ timestamps: true, collection: 'homeworks' })
export class HomeworkModel {
  @Prop({ required: true })
  @ApiProperty()
  subject: string;

  @Prop({ required: true })
  @ApiProperty()
  task: string;

  @Prop({ required: true })
  @ApiProperty()
  date: string;
}

export const HomeworkSchema = SchemaFactory.createForClass(HomeworkModel);
