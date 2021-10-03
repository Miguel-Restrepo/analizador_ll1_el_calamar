import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresdsDataSource} from '../datasources';
import {Primeros, PrimerosRelations, Gramatica} from '../models';
import {GramaticaRepository} from './gramatica.repository';

export class PrimerosRepository extends DefaultCrudRepository<
  Primeros,
  typeof Primeros.prototype.Id,
  PrimerosRelations
> {

  public readonly Gramatica_Perteneces: BelongsToAccessor<Gramatica, typeof Primeros.prototype.Id>;

  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource, @repository.getter('GramaticaRepository') protected gramaticaRepositoryGetter: Getter<GramaticaRepository>,
  ) {
    super(Primeros, dataSource);
    this.Gramatica_Perteneces = this.createBelongsToAccessorFor('Gramatica_Perteneces', gramaticaRepositoryGetter,);
    this.registerInclusionResolver('Gramatica_Perteneces', this.Gramatica_Perteneces.inclusionResolver);
  }
}
