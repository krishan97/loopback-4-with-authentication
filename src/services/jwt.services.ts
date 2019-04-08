import { promisify } from 'util';
import { Users } from '../models';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTAuthenticationService {
  jwt_secret: string = 'krishanThakur97';
  constructor(
  ) { }

  async getAccessToken(users: object): Promise<string> {
    return await signAsync(users, this.jwt_secret);
  }
  async verifyAccessToken(token: string): Promise<Users> {
    return await verifyAsync(token, this.jwt_secret);
  }
}
