import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgresdsDataSource} from '../datasources';
import {Produccion, ProduccionRelations} from '../models';

export class ProduccionRepository extends DefaultCrudRepository<
  Produccion,
  typeof Produccion.prototype.Id,
  ProduccionRelations
> {
  constructor(
    @inject('datasources.postgresds') dataSource: PostgresdsDataSource,
  ) {
    super(Produccion, dataSource);
  }
}
