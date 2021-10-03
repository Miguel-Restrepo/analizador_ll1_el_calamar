import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Variable} from './variable.model';

@model({})
export class Produccion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  Id?: number;

  @property({
    type: 'string',
    required: true,
  })
  Produccion: string;
  @property({
    type: 'number',
  })
  Variable_Produce?: number;

  constructor(data?: Partial<Produccion>) {
    super(data);
  }
}

export interface ProduccionRelations {
  // describe navigational properties here
}

export type ProduccionWithRelations = Produccion & ProduccionRelations;
