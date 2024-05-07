import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: AuthDto) {
    try {
      const salt = await genSalt(10);
      const newUser = new this.userModel({
        userLogin: dto.login,
        passwordHash: await hash(dto.password, salt),
      });
      return newUser.save();
    } catch (error) {
      throw new Error('Failed to create user: ' + error);
    }
  }

  async findUser(userLogin: string) {
    return this.userModel.findOne({ userLogin }).exec();
  }

  async validateUser(
    userLogin: string,
    password: string,
  ): Promise<Pick<UserModel, 'userLogin'>> {
    const user = await this.findUser(userLogin);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong login or password');
    }
    return { userLogin: user.userLogin };
  }

  async login(email: string) {
    try {
      const payload = { email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new Error('Failed to login user: ' + error);
    }
  }
}
