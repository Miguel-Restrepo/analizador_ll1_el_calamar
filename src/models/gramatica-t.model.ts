import {Model, model, property} from '@loopback/repository';
import {ConjuntoPrediccionT} from './conjunto-prediccion-t.model';
import {EstadoT} from './estado-t.model';
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
    type: 'boolean',
    default: false,
  })
  extendida: boolean;
  
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

  @property({
    type: 'array',
    itemType: 'EstadoT',
  })
  estadosLR1: EstadoT[];

  @property({
    type: 'array',
    itemType: 'EstadoT',
  })
  estadosLRAR: EstadoT[];


  constructor(data?: Partial<GramaticaT>) {
    super(data);
  }
}

export interface GramaticaTRelations {
  // describe navigational properties here
}

export type GramaticaTWithRelations = GramaticaT & GramaticaTRelations;
