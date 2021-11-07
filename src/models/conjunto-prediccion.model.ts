import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Gramatica} from './gramatica.model';

@model()
export class ConjuntoPrediccion extends Entity {
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

  constructor(data?: Partial<ConjuntoPrediccion>) {
    super(data);
  }
}

export interface ConjuntoPrediccionRelations {
  // describe navigational properties here
}

export type ConjuntoPrediccionWithRelations = ConjuntoPrediccion & ConjuntoPrediccionRelations;
