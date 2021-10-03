import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ConjuntoPrediccion,
  Gramatica,
} from '../models';
import {ConjuntoPrediccionRepository} from '../repositories';

export class ConjuntoPrediccionGramaticaController {
  constructor(
    @repository(ConjuntoPrediccionRepository)
    public conjuntoPrediccionRepository: ConjuntoPrediccionRepository,
  ) { }

  @get('/conjunto-prediccions/{id}/gramatica', {
    responses: {
      '200': {
        description: 'Gramatica belonging to ConjuntoPrediccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gramatica)},
          },
        },
      },
    },
  })
  async getGramatica(
    @param.path.number('id') id: typeof ConjuntoPrediccion.prototype.Id,
  ): Promise<Gramatica> {
    return this.conjuntoPrediccionRepository.Gramatica_Pertenece(id);
  }
}
