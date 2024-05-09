import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HomeworkDocument = HydratedDocument<HomeworkModel>;

@Schema({ timestamps: true, collection: 'homeworks' })
export class HomeworkModel {
  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  task: string;
}

export const HomeworkSchema = SchemaFactory.createForClass(HomeworkModel);
