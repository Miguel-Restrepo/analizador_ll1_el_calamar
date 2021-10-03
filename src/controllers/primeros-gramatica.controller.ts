import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Primeros,
  Gramatica,
} from '../models';
import {PrimerosRepository} from '../repositories';

export class PrimerosGramaticaController {
  constructor(
    @repository(PrimerosRepository)
    public primerosRepository: PrimerosRepository,
  ) { }

  @get('/primeros/{id}/gramatica', {
    responses: {
      '200': {
        description: 'Gramatica belonging to Primeros',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gramatica)},
          },
        },
      },
    },
  })
  async getGramatica(
    @param.path.number('id') id: typeof Primeros.prototype.Id,
  ): Promise<Gramatica> {
    return this.primerosRepository.Gramatica_Pertenece(id);
  }
}
