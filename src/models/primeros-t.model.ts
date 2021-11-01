import {Model, model, property} from '@loopback/repository';

@model()
export class PrimerosT extends Model {
  @property({
    type: 'string',
  })
  variable?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  produciones: string[];


  constructor(data?: Partial<PrimerosT>) {
    super(data);
  }
}

export interface PrimerosTRelations {
  // describe navigational properties here
}

export type PrimerosTWithRelations = PrimerosT & PrimerosTRelations;
