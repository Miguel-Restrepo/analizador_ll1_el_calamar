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
  ConjuntoPrediccion,
} from '../models';
import {GramaticaRepository} from '../repositories';

export class GramaticaConjuntoPrediccionController {
  constructor(
    @repository(GramaticaRepository) protected gramaticaRepository: GramaticaRepository,
  ) { }

  @get('/gramaticas/{id}/conjunto-prediccions', {
    responses: {
      '200': {
        description: 'Array of Gramatica has many ConjuntoPrediccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ConjuntoPrediccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ConjuntoPrediccion>,
  ): Promise<ConjuntoPrediccion[]> {
    return this.gramaticaRepository.Conjuntos_Predicion(id).find(filter);
  }

  @post('/gramaticas/{id}/conjunto-prediccions', {
    responses: {
      '200': {
        description: 'Gramatica model instance',
        content: {'application/json': {schema: getModelSchemaRef(ConjuntoPrediccion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Gramatica.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConjuntoPrediccion, {
            title: 'NewConjuntoPrediccionInGramatica',
            exclude: ['Id'],
            optional: ['Gramatica_Pertenece']
          }),
        },
      },
    }) conjuntoPrediccion: Omit<ConjuntoPrediccion, 'Id'>,
  ): Promise<ConjuntoPrediccion> {
    return this.gramaticaRepository.Conjuntos_Predicion(id).create(conjuntoPrediccion);
  }

  @patch('/gramaticas/{id}/conjunto-prediccions', {
    responses: {
      '200': {
        description: 'Gramatica.ConjuntoPrediccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConjuntoPrediccion, {partial: true}),
        },
      },
    })
    conjuntoPrediccion: Partial<ConjuntoPrediccion>,
    @param.query.object('where', getWhereSchemaFor(ConjuntoPrediccion)) where?: Where<ConjuntoPrediccion>,
  ): Promise<Count> {
    return this.gramaticaRepository.Conjuntos_Predicion(id).patch(conjuntoPrediccion, where);
  }

  @del('/gramaticas/{id}/conjunto-prediccions', {
    responses: {
      '200': {
        description: 'Gramatica.ConjuntoPrediccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ConjuntoPrediccion)) where?: Where<ConjuntoPrediccion>,
  ): Promise<Count> {
    return this.gramaticaRepository.Conjuntos_Predicion(id).delete(where);
  }
}
