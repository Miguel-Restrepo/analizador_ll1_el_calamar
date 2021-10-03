import {belongsTo, Entity, model, property} from '@loopback/repository';
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
