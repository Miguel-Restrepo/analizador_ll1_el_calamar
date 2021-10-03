import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresdsDataSource} from '../datasources';
import {ConjuntoPrediccion, ConjuntoPrediccionRelations, Gramatica} from '../models';
import {GramaticaRepository} from './gramatica.repository';

export class ConjuntoPrediccionRepository extends DefaultCrudRepository<
  ConjuntoPrediccion,
  typeof ConjuntoPrediccion.prototype.Id,
  ConjuntoPrediccionRelations
> {

  public readonly Gramatica_Perteneces: BelongsToAccessor<Gramatica, typeof ConjuntoPrediccion.prototype.Id>;

  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource, @repository.getter('GramaticaRepository') protected gramaticaRepositoryGetter: Getter<GramaticaRepository>,
  ) {
    super(ConjuntoPrediccion, dataSource);
    this.Gramatica_Perteneces = this.createBelongsToAccessorFor('Gramatica_Perteneces', gramaticaRepositoryGetter,);
    this.registerInclusionResolver('Gramatica_Perteneces', this.Gramatica_Perteneces.inclusionResolver);
  }
}
