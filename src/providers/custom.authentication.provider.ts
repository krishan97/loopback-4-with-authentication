
import { Getter, Provider, Setter, inject } from '@loopback/context';
import { Request } from '@loopback/rest';
import { AuthenticationBindings } from '@loopback/authentication';
import { AuthenticateFn, UserProfile } from '@loopback/authentication';
import { AuthenticationStrategy } from '../strategies/authentication.strategy';


export class AuthenticateActionProvider implements Provider<AuthenticateFn> {
  constructor(
    @inject.getter(AuthenticationBindings.STRATEGY) readonly getStrategy: Getter<AuthenticationStrategy>,
    @inject.setter(AuthenticationBindings.CURRENT_USER) readonly setCurrentUser: Setter<UserProfile>,
  ) { }

  /**
   * @returns authenticateFn
   */
  value(): AuthenticateFn {
    return request => this.action(request);
  }

  /**
   * The implementation of authenticate() sequence action.
   * @param request The incoming request provided by the REST layer
   */
  async action(request: Request): Promise<UserProfile | undefined> {
    const strategy = await this.getStrategy();
    if (!strategy) {
      // The invoked operation does not require authentication.
      return undefined;
    }
    if (!strategy.authenticate) {
      throw new Error('invalid strategy parameter');
    }
    const user = await strategy.authenticate(request);
    if (user) this.setCurrentUser(user);
    return user;
  }
}
