import {Entity, model, property, hasMany} from '@loopback/repository';
import {Variable} from './variable.model';
import {ConjuntoPrediccion} from './conjunto-prediccion.model';
import {Primeros} from './primeros.model';
import {Siguientes} from './siguientes.model';

@model()
export class Gramatica extends Entity {
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
  Archivo: string;

  @hasMany(() => ConjuntoPrediccion, {keyTo: 'Gramatica_Pertenece'})
  Conjuntos_Predicion: ConjuntoPrediccion[];

  @hasMany(() => Primeros, {keyTo: 'Gramatica_Pertenece'})
  primeros: Primeros[];

  @hasMany(() => Siguientes, {keyTo: 'Gramatica_Pertenece'})
  siguientes: Siguientes[];

  @hasMany(() => Variable, {keyTo: 'Gramatica_Pertenece'})
  variables: Variable[];

  constructor(data?: Partial<Gramatica>) {
    super(data);
  }
}

export interface GramaticaRelations {
  // describe navigational properties here
}

export type GramaticaWithRelations = Gramatica & GramaticaRelations;
