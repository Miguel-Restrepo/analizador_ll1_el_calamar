import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Siguientes,
  Gramatica,
} from '../models';
import {SiguientesRepository} from '../repositories';

export class SiguientesGramaticaController {
  constructor(
    @repository(SiguientesRepository)
    public siguientesRepository: SiguientesRepository,
  ) { }

  @get('/siguientes/{id}/gramatica', {
    responses: {
      '200': {
        description: 'Gramatica belonging to Siguientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gramatica)},
          },
        },
      },
    },
  })
  async getGramatica(
    @param.path.number('id') id: typeof Siguientes.prototype.Id,
  ): Promise<Gramatica> {
    return this.siguientesRepository.Gramatica_Pertenece(id);
  }
}
