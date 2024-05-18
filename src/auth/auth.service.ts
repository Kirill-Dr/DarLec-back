import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './user.model';
import { Model } from 'mongoose';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
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
      throw new BadRequestException('Пароли не совпадают');
    }
    const salt = await genSalt(10);
    const newUser = new this.userModel({
      userEmail: dto.email,
      username: dto.username,
      passwordHash: await hash(dto.password, salt),
    });
    return newUser.save();
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
      throw new UnauthorizedException('Пользователь не найден');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Не верный логин или пароль');
    }
    return user;
  }

  async login(user: UserModel) {
    const payload = {
      userEmail: user.userEmail,
      username: user.username,
      role: user.role,
    };
    const accessOptions: JwtSignOptions = { expiresIn: '1h' };
    const accessToken = await this.jwtService.signAsync(payload, accessOptions);
    const refreshPayload = {
      userEmail: user.userEmail,
    };
    const refreshOptions: JwtSignOptions = { expiresIn: '3h' };
    const refreshToken = await this.jwtService.signAsync(
      refreshPayload,
      refreshOptions,
    );
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshToken(oldRefreshToken: string) {
    const { userEmail } = this.jwtService.verify(oldRefreshToken);
    const user = await this.findUserByEmail(userEmail);
    return this.login(user);
  }
}
