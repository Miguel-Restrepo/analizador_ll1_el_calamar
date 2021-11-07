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
  HttpErrors,
} from '@loopback/rest';
import {Primeros} from '../models';
import {PrimerosRepository} from '../repositories';

export class PrimerosController {
  constructor(
    @repository(PrimerosRepository)
    public primerosRepository : PrimerosRepository,
  ) {}

  @post('/primeros')
  @response(200, {
    description: 'Primeros model instance',
    content: {'application/json': {schema: getModelSchemaRef(Primeros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Primeros, {
            title: 'NewPrimeros',
            exclude: ['Id'],
          }),
        },
      },
    })
    primeros: Omit<Primeros, 'Id'>,
  ): Promise<Primeros> {
    return this.primerosRepository.create(primeros);
  }

  @get('/primeros/count')
  @response(200, {
    description: 'Primeros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Primeros) where?: Where<Primeros>,
  ): Promise<Count> {
    return this.primerosRepository.count(where);
  }
  @get('/obtenerprimeros/{id}')
  @response(200, {
    description: 'primeros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Primeros, {includeRelations: true}),
      },
    },
  })
  async obtenerPrimeros(
    @param.path.number('id') id: number,
    @param.filter(Primeros, {exclude: 'where'}) filter?: FilterExcludingWhere<Primeros>
  ): Promise<Primeros[]> {
    let x= await this.primerosRepository.find({
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
  @get('/primeros')
  @response(200, {
    description: 'Array of Primeros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Primeros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Primeros) filter?: Filter<Primeros>,
  ): Promise<Primeros[]> {
    return this.primerosRepository.find(filter);
  }

  @patch('/primeros')
  @response(200, {
    description: 'Primeros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Primeros, {partial: true}),
        },
      },
    })
    primeros: Primeros,
    @param.where(Primeros) where?: Where<Primeros>,
  ): Promise<Count> {
    return this.primerosRepository.updateAll(primeros, where);
  }

  @get('/primeros/{id}')
  @response(200, {
    description: 'Primeros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Primeros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Primeros, {exclude: 'where'}) filter?: FilterExcludingWhere<Primeros>
  ): Promise<Primeros> {
    return this.primerosRepository.findById(id, filter);
  }

  @patch('/primeros/{id}')
  @response(204, {
    description: 'Primeros PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Primeros, {partial: true}),
        },
      },
    })
    primeros: Primeros,
  ): Promise<void> {
    await this.primerosRepository.updateById(id, primeros);
  }

  @put('/primeros/{id}')
  @response(204, {
    description: 'Primeros PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() primeros: Primeros,
  ): Promise<void> {
    await this.primerosRepository.replaceById(id, primeros);
  }

  @del('/primeros/{id}')
  @response(204, {
    description: 'Primeros DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.primerosRepository.deleteById(id);
  }
}
