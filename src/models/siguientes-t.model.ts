import {Model, model, property} from '@loopback/repository';

@model()
export class SiguientesT extends Model {
  @property({
    type: 'string',
  })
  variable?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  produciones: string[];


  constructor(data?: Partial<SiguientesT>) {
    super(data);
  }
}

export interface SiguientesTRelations {
  // describe navigational properties here
}

export type SiguientesTWithRelations = SiguientesT & SiguientesTRelations;
