import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: RegisterAuthDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    try {
      const salt = await genSalt(10);
      const newUser = new this.userModel({
        userEmail: dto.email,
        username: dto.username,
        passwordHash: await hash(dto.password, salt),
      });
      return newUser.save();
    } catch (error) {
      throw new Error('Failed to create user: ' + error);
    }
  }

  async findUserByEmail(userEmail: string) {
    return this.userModel.findOne({ userEmail }).exec();
  }

  async findUserByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async validateUser(userEmail: string, password: string): Promise<UserModel> {
    const user = await this.findUserByEmail(userEmail);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong login or password');
    }
    return user;
  }

  async login(user: UserModel) {
    try {
      const payload = {
        userEmail: user.userEmail,
        username: user.username,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new Error('Failed to login user: ' + error);
    }
  }
}
