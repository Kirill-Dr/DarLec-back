import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { UserModel } from '../user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: UserModel, done: VerifiedCallback) {
    const user = await this.authService.findUserByEmail(payload.userEmail);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
