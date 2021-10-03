import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresdsDataSource} from '../datasources';
import {Gramatica, GramaticaRelations, ConjuntoPrediccion, Primeros, Siguientes, Variable} from '../models';
import {ConjuntoPrediccionRepository} from './conjunto-prediccion.repository';
import {PrimerosRepository} from './primeros.repository';
import {SiguientesRepository} from './siguientes.repository';
import {VariableRepository} from './variable.repository';

export class GramaticaRepository extends DefaultCrudRepository<
  Gramatica,
  typeof Gramatica.prototype.Id,
  GramaticaRelations
> {

  public readonly Conjuntos_Predicion: HasManyRepositoryFactory<ConjuntoPrediccion, typeof Gramatica.prototype.Id>;

  public readonly primeros: HasManyRepositoryFactory<Primeros, typeof Gramatica.prototype.Id>;

  public readonly siguientes: HasManyRepositoryFactory<Siguientes, typeof Gramatica.prototype.Id>;

  public readonly variables: HasManyRepositoryFactory<Variable, typeof Gramatica.prototype.Id>;

  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource, @repository.getter('ConjuntoPrediccionRepository') protected conjuntoPrediccionRepositoryGetter: Getter<ConjuntoPrediccionRepository>, @repository.getter('PrimerosRepository') protected primerosRepositoryGetter: Getter<PrimerosRepository>, @repository.getter('SiguientesRepository') protected siguientesRepositoryGetter: Getter<SiguientesRepository>, @repository.getter('VariableRepository') protected variableRepositoryGetter: Getter<VariableRepository>,
  ) {
    super(Gramatica, dataSource);
    this.variables = this.createHasManyRepositoryFactoryFor('variables', variableRepositoryGetter,);
    this.registerInclusionResolver('variables', this.variables.inclusionResolver);
    this.siguientes = this.createHasManyRepositoryFactoryFor('siguientes', siguientesRepositoryGetter,);
    this.registerInclusionResolver('siguientes', this.siguientes.inclusionResolver);
    this.primeros = this.createHasManyRepositoryFactoryFor('primeros', primerosRepositoryGetter,);
    this.registerInclusionResolver('primeros', this.primeros.inclusionResolver);
    this.Conjuntos_Predicion = this.createHasManyRepositoryFactoryFor('Conjuntos_Predicion', conjuntoPrediccionRepositoryGetter,);
    this.registerInclusionResolver('Conjuntos_Predicion', this.Conjuntos_Predicion.inclusionResolver);
  }
}
