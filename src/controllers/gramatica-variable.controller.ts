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
  Variable,
} from '../models';
import {GramaticaRepository} from '../repositories';

export class GramaticaVariableController {
  constructor(
    @repository(GramaticaRepository) protected gramaticaRepository: GramaticaRepository,
  ) { }

  @get('/gramaticas/{id}/variables', {
    responses: {
      '200': {
        description: 'Array of Gramatica has many Variable',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Variable)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Variable>,
  ): Promise<Variable[]> {
    return this.gramaticaRepository.variables(id).find(filter);
  }

  @post('/gramaticas/{id}/variables', {
    responses: {
      '200': {
        description: 'Gramatica model instance',
        content: {'application/json': {schema: getModelSchemaRef(Variable)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Gramatica.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variable, {
            title: 'NewVariableInGramatica',
            exclude: ['Id'],
            optional: ['Gramatica_Pertenece']
          }),
        },
      },
    }) variable: Omit<Variable, 'Id'>,
  ): Promise<Variable> {
    return this.gramaticaRepository.variables(id).create(variable);
  }

  @patch('/gramaticas/{id}/variables', {
    responses: {
      '200': {
        description: 'Gramatica.Variable PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variable, {partial: true}),
        },
      },
    })
    variable: Partial<Variable>,
    @param.query.object('where', getWhereSchemaFor(Variable)) where?: Where<Variable>,
  ): Promise<Count> {
    return this.gramaticaRepository.variables(id).patch(variable, where);
  }

  @del('/gramaticas/{id}/variables', {
    responses: {
      '200': {
        description: 'Gramatica.Variable DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Variable)) where?: Where<Variable>,
  ): Promise<Count> {
    return this.gramaticaRepository.variables(id).delete(where);
  }
}
