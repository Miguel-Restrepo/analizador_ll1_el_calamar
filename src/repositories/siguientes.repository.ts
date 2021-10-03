import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresdsDataSource} from '../datasources';
import {Siguientes, SiguientesRelations, Gramatica} from '../models';
import {GramaticaRepository} from './gramatica.repository';

export class SiguientesRepository extends DefaultCrudRepository<
  Siguientes,
  typeof Siguientes.prototype.Id,
  SiguientesRelations
> {

  public readonly Gramatica_Pertenece: BelongsToAccessor<Gramatica, typeof Siguientes.prototype.Id>;

  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource, @repository.getter('GramaticaRepository') protected gramaticaRepositoryGetter: Getter<GramaticaRepository>,
  ) {
    super(Siguientes, dataSource);
    this.Gramatica_Pertenece = this.createBelongsToAccessorFor('Gramatica_Pertenece', gramaticaRepositoryGetter,);
    this.registerInclusionResolver('Gramatica_Pertenece', this.Gramatica_Pertenece.inclusionResolver);
  }
}
