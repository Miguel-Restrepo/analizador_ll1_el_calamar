import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Variable,
  Gramatica,
} from '../models';
import {VariableRepository} from '../repositories';

export class VariableGramaticaController {
  constructor(
    @repository(VariableRepository)
    public variableRepository: VariableRepository,
  ) { }

  @get('/variables/{id}/gramatica', {
    responses: {
      '200': {
        description: 'Gramatica belonging to Variable',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Gramatica)},
          },
        },
      },
    },
  })
  async getGramatica(
    @param.path.number('id') id: typeof Variable.prototype.Id,
  ): Promise<Gramatica> {
    return this.variableRepository.Gramatica_Pertenece(id);
  }
}
