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

  public readonly Gramatica_Pertenece: BelongsToAccessor<Gramatica, typeof ConjuntoPrediccion.prototype.Id>;

  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource, @repository.getter('GramaticaRepository') protected gramaticaRepositoryGetter: Getter<GramaticaRepository>,
  ) {
    super(ConjuntoPrediccion, dataSource);
    this.Gramatica_Pertenece = this.createBelongsToAccessorFor('Gramatica_Pertenece', gramaticaRepositoryGetter,);
    this.registerInclusionResolver('Gramatica_Pertenece', this.Gramatica_Pertenece.inclusionResolver);
  }
}
