
import { inject } from '@loopback/context';
import { repository } from '@loopback/repository';
import { UsersRepository } from '../repositories';
import { Users } from '../models';
import { HttpErrors, param, requestBody, get, patch, del, } from '@loopback/rest';
import {
  AuthenticationBindings,
  UserProfile,
  authenticate,
} from '@loopback/authentication';

export class UsersController {
  constructor(@repository(UsersRepository) protected userRepo: UsersRepository,
    @inject(AuthenticationBindings.CURRENT_USER) private users: UserProfile,
  ) { }

  @authenticate('jwtStrategy')
  @get('/users')
  async getUser(@param({
    name: 'authorization',
    in: 'header',
    required: true,
    description: 'Bearer token',
    schema: { type: 'string' },
  }) access_token: string, ) {
    const getusers = await this.userRepo.findOne({ where: { id: this.users.id } });
    if (getusers) {
      delete getusers.password;
      delete getusers.id;
    }
    return getusers;
  }

  @authenticate('jwtStrategy')
  @patch('/users')
  async update(@param({
    name: 'authorization',
    in: 'header',
    required: true,
    description: 'Bearer token',
    schema: { type: 'string' },
  }) access_token: string,
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                example: 'Jyoti Bala'
              },
              password: {
                type: 'string',
                example: 'jyoti123'
              },
              phone: {
                type: 'string',
                example: '123456701'
              },
              age: {
                type: 'string',
                example: '25'
              },
            }
          },
        },
      }
    }) user: Users) {

    if (!user.name) {
      throw new HttpErrors.BadRequest('name is required');
    }
    return await this.userRepo.updateById(this.users.id, user);
  }

  @authenticate('jwtStrategy')
  @del('/users')
  async delete(@param({
    name: 'authorization',
    in: 'header',
    required: true,
    description: 'Bearer token',
    schema: { type: 'string' },
  }) access_token: string, ) {
    return await this.userRepo.deleteById(this.users.id);
  }

}
