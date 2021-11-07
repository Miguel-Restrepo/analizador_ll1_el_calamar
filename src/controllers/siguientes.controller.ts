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
import {Siguientes} from '../models';
import {SiguientesRepository} from '../repositories';

export class SiguientesController {
  constructor(
    @repository(SiguientesRepository)
    public siguientesRepository : SiguientesRepository,
  ) {}
  @get('/obtenersiguientes/{id}')
  @response(200, {
    description: 'primeros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Siguientes, {includeRelations: true}),
      },
    },
  })
  async obtenerPrimeros(
    @param.path.number('id') id: number,
    @param.filter(Siguientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Siguientes>
  ): Promise<Siguientes[]> {
    let x= await this.siguientesRepository.find({
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
  @post('/siguientes')
  @response(200, {
    description: 'Siguientes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Siguientes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Siguientes, {
            title: 'NewSiguientes',
            exclude: ['Id'],
          }),
        },
      },
    })
    siguientes: Omit<Siguientes, 'Id'>,
  ): Promise<Siguientes> {
    return this.siguientesRepository.create(siguientes);
  }

  @get('/siguientes/count')
  @response(200, {
    description: 'Siguientes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Siguientes) where?: Where<Siguientes>,
  ): Promise<Count> {
    return this.siguientesRepository.count(where);
  }

  @get('/siguientes')
  @response(200, {
    description: 'Array of Siguientes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Siguientes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Siguientes) filter?: Filter<Siguientes>,
  ): Promise<Siguientes[]> {
    return this.siguientesRepository.find(filter);
  }

  @patch('/siguientes')
  @response(200, {
    description: 'Siguientes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Siguientes, {partial: true}),
        },
      },
    })
    siguientes: Siguientes,
    @param.where(Siguientes) where?: Where<Siguientes>,
  ): Promise<Count> {
    return this.siguientesRepository.updateAll(siguientes, where);
  }

  @get('/siguientes/{id}')
  @response(200, {
    description: 'Siguientes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Siguientes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Siguientes, {exclude: 'where'}) filter?: FilterExcludingWhere<Siguientes>
  ): Promise<Siguientes> {
    return this.siguientesRepository.findById(id, filter);
  }

  @patch('/siguientes/{id}')
  @response(204, {
    description: 'Siguientes PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Siguientes, {partial: true}),
        },
      },
    })
    siguientes: Siguientes,
  ): Promise<void> {
    await this.siguientesRepository.updateById(id, siguientes);
  }

  @put('/siguientes/{id}')
  @response(204, {
    description: 'Siguientes PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() siguientes: Siguientes,
  ): Promise<void> {
    await this.siguientesRepository.replaceById(id, siguientes);
  }

  @del('/siguientes/{id}')
  @response(204, {
    description: 'Siguientes DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.siguientesRepository.deleteById(id);
  }
}
