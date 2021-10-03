import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Variable} from './variable.model';
import {Gramatica} from './gramatica.model';

@model({
  settings: {
    foreignKeys: {
      fk_gramatica: {
        name: 'fk_gramatica',
        entity: 'Gramatica',
        entityKey: 'Id',
        foreignKey: 'Gramatica_Pertenece',
      },
    },
  },
})
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

  @belongsTo(() => Gramatica, {name: 'Gramatica_Perteneces'})
  Gramatica_Pertenece: number;

  constructor(data?: Partial<Siguientes>) {
    super(data);
  }
}

export interface SiguientesRelations {
  // describe navigational properties here
}

export type SiguientesWithRelations = Siguientes & SiguientesRelations;
