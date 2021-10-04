import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Gramatica} from '../models';
import {GramaticaRepository} from '../repositories';

export class GramaticaController {
  constructor(
    @repository(GramaticaRepository)
    public gramaticaRepository : GramaticaRepository,
  ) {}

  @post('/gramaticas')
  @response(200, {
    description: 'Gramatica model instance',
    content: {'application/json': {schema: getModelSchemaRef(Gramatica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gramatica, {
            title: 'NewGramatica',
            exclude: ['Id'],
          }),
        },
      },
    })
    gramatica: Omit<Gramatica, 'Id'>,
  ): Promise<Gramatica> {
    return this.gramaticaRepository.create(gramatica);
  }

  @get('/gramaticas/count')
  @response(200, {
    description: 'Gramatica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Gramatica) where?: Where<Gramatica>,
  ): Promise<Count> {
    return this.gramaticaRepository.count(where);
  }

  @get('/gramaticas')
  @response(200, {
    description: 'Array of Gramatica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Gramatica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Gramatica) filter?: Filter<Gramatica>,
  ): Promise<Gramatica[]> {
    return this.gramaticaRepository.find(filter);
  }

  @patch('/gramaticas')
  @response(200, {
    description: 'Gramatica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gramatica, {partial: true}),
        },
      },
    })
    gramatica: Gramatica,
    @param.where(Gramatica) where?: Where<Gramatica>,
  ): Promise<Count> {
    return this.gramaticaRepository.updateAll(gramatica, where);
  }

  @get('/gramaticas/{id}')
  @response(200, {
    description: 'Gramatica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Gramatica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Gramatica, {exclude: 'where'}) filter?: FilterExcludingWhere<Gramatica>
  ): Promise<Gramatica> {
    return this.gramaticaRepository.findById(id, filter);
  }

  @patch('/gramaticas/{id}')
  @response(204, {
    description: 'Gramatica PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Gramatica, {partial: true}),
        },
      },
    })
    gramatica: Gramatica,
  ): Promise<void> {
    await this.gramaticaRepository.updateById(id, gramatica);
  }

  @put('/gramaticas/{id}')
  @response(204, {
    description: 'Gramatica PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() gramatica: Gramatica,
  ): Promise<void> {
    await this.gramaticaRepository.replaceById(id, gramatica);
  }

  @del('/gramaticas/{id}')
  @response(204, {
    description: 'Gramatica DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.gramaticaRepository.deleteById(id);
  }
}
