import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Gramatica,
  Siguientes,
} from '../models';
import {GramaticaRepository} from '../repositories';

export class GramaticaSiguientesController {
  constructor(
    @repository(GramaticaRepository) protected gramaticaRepository: GramaticaRepository,
  ) { }

  @get('/gramaticas/{id}/siguientes', {
    responses: {
      '200': {
        description: 'Array of Gramatica has many Siguientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Siguientes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Siguientes>,
  ): Promise<Siguientes[]> {
    return this.gramaticaRepository.siguientes(id).find(filter);
  }

  @post('/gramaticas/{id}/siguientes', {
    responses: {
      '200': {
        description: 'Gramatica model instance',
        content: {'application/json': {schema: getModelSchemaRef(Siguientes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Gramatica.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Siguientes, {
            title: 'NewSiguientesInGramatica',
            exclude: ['Id'],
            optional: ['Gramatica_Pertenece']
          }),
        },
      },
    }) siguientes: Omit<Siguientes, 'Id'>,
  ): Promise<Siguientes> {
    return this.gramaticaRepository.siguientes(id).create(siguientes);
  }

  @patch('/gramaticas/{id}/siguientes', {
    responses: {
      '200': {
        description: 'Gramatica.Siguientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Siguientes, {partial: true}),
        },
      },
    })
    siguientes: Partial<Siguientes>,
    @param.query.object('where', getWhereSchemaFor(Siguientes)) where?: Where<Siguientes>,
  ): Promise<Count> {
    return this.gramaticaRepository.siguientes(id).patch(siguientes, where);
  }

  @del('/gramaticas/{id}/siguientes', {
    responses: {
      '200': {
        description: 'Gramatica.Siguientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Siguientes)) where?: Where<Siguientes>,
  ): Promise<Count> {
    return this.gramaticaRepository.siguientes(id).delete(where);
  }
}
