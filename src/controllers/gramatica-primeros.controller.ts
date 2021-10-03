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
  Primeros,
} from '../models';
import {GramaticaRepository} from '../repositories';

export class GramaticaPrimerosController {
  constructor(
    @repository(GramaticaRepository) protected gramaticaRepository: GramaticaRepository,
  ) { }

  @get('/gramaticas/{id}/primeros', {
    responses: {
      '200': {
        description: 'Array of Gramatica has many Primeros',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Primeros)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Primeros>,
  ): Promise<Primeros[]> {
    return this.gramaticaRepository.primeros(id).find(filter);
  }

  @post('/gramaticas/{id}/primeros', {
    responses: {
      '200': {
        description: 'Gramatica model instance',
        content: {'application/json': {schema: getModelSchemaRef(Primeros)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Gramatica.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Primeros, {
            title: 'NewPrimerosInGramatica',
            exclude: ['Id'],
            optional: ['Gramatica_Pertenece']
          }),
        },
      },
    }) primeros: Omit<Primeros, 'Id'>,
  ): Promise<Primeros> {
    return this.gramaticaRepository.primeros(id).create(primeros);
  }

  @patch('/gramaticas/{id}/primeros', {
    responses: {
      '200': {
        description: 'Gramatica.Primeros PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Primeros, {partial: true}),
        },
      },
    })
    primeros: Partial<Primeros>,
    @param.query.object('where', getWhereSchemaFor(Primeros)) where?: Where<Primeros>,
  ): Promise<Count> {
    return this.gramaticaRepository.primeros(id).patch(primeros, where);
  }

  @del('/gramaticas/{id}/primeros', {
    responses: {
      '200': {
        description: 'Gramatica.Primeros DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Primeros)) where?: Where<Primeros>,
  ): Promise<Count> {
    return this.gramaticaRepository.primeros(id).delete(where);
  }
}
