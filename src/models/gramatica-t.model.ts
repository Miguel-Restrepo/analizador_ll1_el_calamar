import {Model, model, property} from '@loopback/repository';
import {ConjuntoPrediccionT} from './conjunto-prediccion-t.model';
import {PrimerosT} from './primeros-t.model';
import {SiguientesT} from './siguientes-t.model';
import {VariableT} from './variable-t.model';

@model()
export class GramaticaT extends Model {
  @property({
    type: 'string',
  })
  nombre?: string;

  @property({
    type: 'array',
    itemType: 'VariableT',
  })
  variables: VariableT[];

  @property({
    type: 'array',
    itemType: 'PrimerosT',
  })
  primeros: PrimerosT[];

  @property({
    type: 'array',
    itemType: 'SiguientesT',
  })
  siguientes: SiguientesT[];

  @property({
    type: 'array',
    itemType: 'ConjuntoPrediccionT',
  })
  conjuntoPrediccion: ConjuntoPrediccionT[];

  @property({
    type: 'boolean',
    default: false,
  })
  es: boolean;


  constructor(data?: Partial<GramaticaT>) {
    super(data);
  }
}

export interface GramaticaTRelations {
  // describe navigational properties here
}

export type GramaticaTWithRelations = GramaticaT & GramaticaTRelations;
