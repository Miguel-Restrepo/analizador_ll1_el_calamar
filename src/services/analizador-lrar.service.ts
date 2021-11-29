import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {GramaticaT} from '../models/gramatica-t.model';
import {VariableT} from '../models/variable-t.model';
import {GramaticaRepository, ProduccionRepository, VariableRepository} from '../repositories';
@injectable({scope: BindingScope.TRANSIENT})
export class AnalizadorLrarService {
  constructor(/* Add @inject to inject parameters */
    @repository(VariableRepository)
    public variableRepository: VariableRepository,
    @repository(GramaticaRepository)
    public gramaticaRepository: GramaticaRepository,
    @repository(ProduccionRepository)
    public produccionRepository: ProduccionRepository,
  ) { }
  gramaticaanalizada: GramaticaT = new GramaticaT()
  /*
   * Add service methods here
   */
  analizarLRAR(gramaticaT: GramaticaT) {
    this.extenderGramatica(gramaticaT);
  }

  extenderGramatica(gramaticaT: GramaticaT) {
    let variables = gramaticaT.variables;
    let nuevaVariable = new VariableT();
    nuevaVariable.variable = "S";
    if (gramaticaT.variables[0].variable == "S") {
      nuevaVariable.variable = "H";
    }
    nuevaVariable.producciones.push(gramaticaT.variables[0].variable);
    let nuevasVariables: VariableT[] = [];
    nuevasVariables.push(nuevaVariable);
    gramaticaT.variables.forEach(element => {
      nuevasVariables.push(element);
    });
    gramaticaT.variables = nuevasVariables;
  }

  colocarPuntos(gramaticaT: GramaticaT) {
    for (let i = 0; i < gramaticaT.variables.length; i++) {
      for (let f = 0; f < gramaticaT.variables[i].producciones.length; f++) {
        gramaticaT.variables[i].orden = f;
        gramaticaT.variables[i].producciones[f] = "." + gramaticaT.variables[i].producciones[f];
      }
    }

  }
}
