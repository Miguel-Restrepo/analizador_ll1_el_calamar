import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Variable} from './variable.model';
import {Gramatica} from './gramatica.model';

@model()
export class Siguientes extends Entity {

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
  Nombre: string;
  @property({
    type: 'string',
    required: true,
  })
  Produciones: string;
  @property({
    type: 'number',
    required: true,
  })
  Gramatica: number;
  @belongsTo(() => Gramatica, {name: 'Gramatica_Pertenece'})
  Gramatica_Pertenece: number;

  constructor(data?: Partial<Siguientes>) {
    super(data);
  }
}

export interface SiguientesRelations {
  // describe navigational properties here
}

export type SiguientesWithRelations = Siguientes & SiguientesRelations;
