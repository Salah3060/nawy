// Nest
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

// Lib
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      ignoreExpiration: false, // Ensure token expiration is checked
      secretOrKey: configService.get<string>('jwtSecret') || 'defaultSecretKey', // Secret key for verifying the JWT token
    });
  }

  async validate(payload: any) {
    // Payload is the decoded JWT token, used to get the user info
    return {
      userId: payload.sub,
      name: payload.name,
      username: payload.username,
      role: payload.role,
    };
  }
}
