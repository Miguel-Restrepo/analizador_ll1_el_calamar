import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {PostgresdsDataSource} from '../datasources';
import {Variable, VariableRelations, Gramatica} from '../models';
import {GramaticaRepository} from './gramatica.repository';

export class VariableRepository extends DefaultCrudRepository<
  Variable,
  typeof Variable.prototype.Id,
  VariableRelations
> {

  public readonly Gramatica_Perteneces: BelongsToAccessor<Gramatica, typeof Variable.prototype.Id>;

  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource, @repository.getter('GramaticaRepository') protected gramaticaRepositoryGetter: Getter<GramaticaRepository>,
  ) {
    super(Variable, dataSource);
    this.Gramatica_Perteneces = this.createBelongsToAccessorFor('Gramatica_Perteneces', gramaticaRepositoryGetter,);
    this.registerInclusionResolver('Gramatica_Perteneces', this.Gramatica_Perteneces.inclusionResolver);
  }
}
