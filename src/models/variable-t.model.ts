import {Model, model, property} from '@loopback/repository';

@model()
export class VariableT extends Model {
  @property({
    type: 'string',
  })
  variable: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  producciones: string[];

  @property({
    type: 'number',
  })
  orden?: number;
  
  constructor(data?: Partial<VariableT>) {
    super(data);
  }
}

export interface VariableTRelations {
  // describe navigational properties here
}

export type VariableTWithRelations = VariableT & VariableTRelations;
