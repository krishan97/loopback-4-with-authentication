import {DefaultCrudRepository} from '@loopback/repository';
import {Users} from '../models';
import {MongoDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id
> {
  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource,
  ) {
    super(Users, dataSource);
  }
}
