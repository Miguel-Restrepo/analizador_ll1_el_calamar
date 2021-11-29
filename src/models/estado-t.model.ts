import {Model, model, property} from '@loopback/repository';
import {VariableT} from '.';

@model()
export class EstadoT extends Model {
  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'array',
    itemType: 'VariableT',
  })
  variables?: VariableT[];

  @property({
    type: 'array',
    itemType: 'estadoT',
  })
  adyacencias?: EstadoT[];

  @property({
    type: 'string',
  })
  R?: string;
  
  constructor(data?: Partial<EstadoT>) {
    super(data);
  }
}

export interface EstadoTRelations {
  // describe navigational properties here
}

export type EstadoTWithRelations = EstadoT & EstadoTRelations;
