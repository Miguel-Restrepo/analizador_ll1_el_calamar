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
import {Variable} from '../models';
import {VariableRepository} from '../repositories';

export class VariableController {
  constructor(
    @repository(VariableRepository)
    public variableRepository : VariableRepository,
  ) {}

  @post('/variables')
  @response(200, {
    description: 'Variable model instance',
    content: {'application/json': {schema: getModelSchemaRef(Variable)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variable, {
            title: 'NewVariable',
            exclude: ['Id'],
          }),
        },
      },
    })
    variable: Omit<Variable, 'Id'>,
  ): Promise<Variable> {
    return this.variableRepository.create(variable);
  }

  @get('/variables/count')
  @response(200, {
    description: 'Variable model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Variable) where?: Where<Variable>,
  ): Promise<Count> {
    return this.variableRepository.count(where);
  }

  @get('/variables')
  @response(200, {
    description: 'Array of Variable model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Variable, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Variable) filter?: Filter<Variable>,
  ): Promise<Variable[]> {
    return this.variableRepository.find(filter);
  }

  @patch('/variables')
  @response(200, {
    description: 'Variable PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variable, {partial: true}),
        },
      },
    })
    variable: Variable,
    @param.where(Variable) where?: Where<Variable>,
  ): Promise<Count> {
    return this.variableRepository.updateAll(variable, where);
  }

  @get('/variables/{id}')
  @response(200, {
    description: 'Variable model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Variable, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Variable, {exclude: 'where'}) filter?: FilterExcludingWhere<Variable>
  ): Promise<Variable> {
    return this.variableRepository.findById(id, filter);
  }

  @patch('/variables/{id}')
  @response(204, {
    description: 'Variable PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Variable, {partial: true}),
        },
      },
    })
    variable: Variable,
  ): Promise<void> {
    await this.variableRepository.updateById(id, variable);
  }

  @put('/variables/{id}')
  @response(204, {
    description: 'Variable PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() variable: Variable,
  ): Promise<void> {
    await this.variableRepository.replaceById(id, variable);
  }

  @del('/variables/{id}')
  @response(204, {
    description: 'Variable DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.variableRepository.deleteById(id);
  }
}
