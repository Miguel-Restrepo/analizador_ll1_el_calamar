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
  HttpErrors,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ConjuntoPrediccion} from '../models';
import {ConjuntoPrediccionRepository} from '../repositories';

export class ConjuntoPrediccionController {
  constructor(
    @repository(ConjuntoPrediccionRepository)
    public conjuntoPrediccionRepository : ConjuntoPrediccionRepository,
  ) {}

  @post('/conjunto-prediccions')
  @response(200, {
    description: 'ConjuntoPrediccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(ConjuntoPrediccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConjuntoPrediccion, {
            title: 'NewConjuntoPrediccion',
            exclude: ['Id'],
          }),
        },
      },
    })
    conjuntoPrediccion: Omit<ConjuntoPrediccion, 'Id'>,
  ): Promise<ConjuntoPrediccion> {
    return this.conjuntoPrediccionRepository.create(conjuntoPrediccion);
  }

  @get('/conjunto-prediccions/count')
  @response(200, {
    description: 'ConjuntoPrediccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ConjuntoPrediccion) where?: Where<ConjuntoPrediccion>,
  ): Promise<Count> {
    return this.conjuntoPrediccionRepository.count(where);
  }

  @get('/conjunto-prediccions')
  @response(200, {
    description: 'Array of ConjuntoPrediccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ConjuntoPrediccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ConjuntoPrediccion) filter?: Filter<ConjuntoPrediccion>,
  ): Promise<ConjuntoPrediccion[]> {
    return this.conjuntoPrediccionRepository.find(filter);
  }

  @patch('/conjunto-prediccions')
  @response(200, {
    description: 'ConjuntoPrediccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConjuntoPrediccion, {partial: true}),
        },
      },
    })
    conjuntoPrediccion: ConjuntoPrediccion,
    @param.where(ConjuntoPrediccion) where?: Where<ConjuntoPrediccion>,
  ): Promise<Count> {
    return this.conjuntoPrediccionRepository.updateAll(conjuntoPrediccion, where);
  }

  @get('/conjunto-prediccions/{id}')
  @response(200, {
    description: 'ConjuntoPrediccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConjuntoPrediccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ConjuntoPrediccion, {exclude: 'where'}) filter?: FilterExcludingWhere<ConjuntoPrediccion>
  ): Promise<ConjuntoPrediccion> {
    return this.conjuntoPrediccionRepository.findById(id, filter);
  }
   @get('/obtenercp/{id}')
  @response(200, {
    description: 'ConjuntoPrediccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ConjuntoPrediccion, {includeRelations: true}),
      },
    },
  })
  async obtenerCP(
    @param.path.number('id') id: number,
    @param.filter(ConjuntoPrediccion, {exclude: 'where'}) filter?: FilterExcludingWhere<ConjuntoPrediccion>
  ): Promise<ConjuntoPrediccion[]> {
    let x= await this.conjuntoPrediccionRepository.find({
      where: {
        Gramatica: id
      }
    });
    if(x)
    {
      return x;
    }
    throw new HttpErrors[403]('No se encontraron Conjuntos Predicion');
  }

  @patch('/conjunto-prediccions/{id}')
  @response(204, {
    description: 'ConjuntoPrediccion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ConjuntoPrediccion, {partial: true}),
        },
      },
    })
    conjuntoPrediccion: ConjuntoPrediccion,
  ): Promise<void> {
    await this.conjuntoPrediccionRepository.updateById(id, conjuntoPrediccion);
  }

  @put('/conjunto-prediccions/{id}')
  @response(204, {
    description: 'ConjuntoPrediccion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() conjuntoPrediccion: ConjuntoPrediccion,
  ): Promise<void> {
    await this.conjuntoPrediccionRepository.replaceById(id, conjuntoPrediccion);
  }

  @del('/conjunto-prediccions/{id}')
  @response(204, {
    description: 'ConjuntoPrediccion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.conjuntoPrediccionRepository.deleteById(id);
  }
}
