import { Entity, model, property } from '@loopback/repository';

@model({ settings: { "strict": false } })
export class Users extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    hidden: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
  })
  phone: string;

  @property({
    type: 'string',
  })
  age: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // tslint:disable-next-line: no-any
  [prop: string]: any;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}
