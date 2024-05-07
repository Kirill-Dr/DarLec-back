import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true, collection: 'users' })
export class UserModel {
  @Prop({ required: true })
  @ApiProperty()
  userLogin: string;

  @Prop({ required: true })
  @ApiProperty()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
