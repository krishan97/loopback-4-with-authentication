import { BindingKey } from '@loopback/context';
import { JWTAuthenticationService } from './services';
import { JWTStrategy } from './strategies/JWT.strategy';


export namespace JWTAuthenticationBindings {
  export const STRATEGY = BindingKey.create<JWTStrategy>(
    'authentication.strategies.jwt.strategy',
  );
  export const SERVICE = BindingKey.create<JWTAuthenticationService>(
    'services.authentication.jwt.service',
  );
}

