import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mongo-db.datasource.json';

export class MongoDbDataSource extends juggler.DataSource {
  static dataSourceName = 'mongoDb';

  constructor(
    @inject('datasources.config.mongoDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
