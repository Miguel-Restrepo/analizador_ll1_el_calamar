import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Gramatica} from './gramatica.model';
import {Produccion} from './produccion.model';

@model()
export class Variable extends Entity {
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

  constructor(data?: Partial<Variable>) {
    super(data);
  }
}

export interface VariableRelations {
  // describe navigational properties here
}

export type VariableWithRelations = Variable & VariableRelations;
