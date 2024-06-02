import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'email', // Use the email field as the username
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      return await this.userService.verifyUser(email, password); //We will define 'verifyUser' in the user service later; for now, let's just declare it
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
