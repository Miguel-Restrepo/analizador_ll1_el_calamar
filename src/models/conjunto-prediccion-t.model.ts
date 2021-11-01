import {Model, model, property} from '@loopback/repository';

@model()
export class ConjuntoPrediccionT extends Model {
  @property({
    type: 'string',
  })
  variable?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  producciones: string[];


  constructor(data?: Partial<ConjuntoPrediccionT>) {
    super(data);
  }
}

export interface ConjuntoPrediccionTRelations {
  // describe navigational properties here
}

export type ConjuntoPrediccionTWithRelations = ConjuntoPrediccionT & ConjuntoPrediccionTRelations;
