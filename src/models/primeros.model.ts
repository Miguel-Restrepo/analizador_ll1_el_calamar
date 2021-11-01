import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Variable} from './variable.model';
import {Gramatica} from './gramatica.model';

@model()
export class Primeros extends Entity {

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

  @belongsTo(() => Gramatica, {name: 'Gramatica_Pertenece'})
  Gramatica_Pertenece: number;

  constructor(data?: Partial<Primeros>) {
    super(data);
  }
}

export interface PrimerosRelations {
  // describe navigational properties here
}

export type PrimerosWithRelations = Primeros & PrimerosRelations;
