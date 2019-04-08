import { UserProfile } from '@loopback/authentication';
import { Request } from '@loopback/rest';

export interface AuthenticationStrategy {
  authenticate(request: Request): Promise<UserProfile | undefined>;
}
