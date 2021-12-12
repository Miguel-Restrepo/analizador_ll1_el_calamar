import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {EstadoT} from '../models/estado-t.model';
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
    nuevaVariable.producciones = [];
    nuevaVariable.producciones.push(gramaticaT.variables[0].variable);

    let nuevasVariables: VariableT[] = [];
    nuevasVariables.push(nuevaVariable);
    variables.forEach(element => {
      nuevasVariables.push(element);
    });
    let estado = new EstadoT();
    estado.nombre = "l-0";
    estado.variables = nuevasVariables;
    gramaticaT.extendida = true;
    gramaticaT.estadosLRAR = [];
    gramaticaT.estadosLRAR.push(estado);
    this.colocarPuntos(gramaticaT);
  }

  colocarPuntos(gramaticaT: GramaticaT) {
    for (let g = 0; g < gramaticaT.estadosLRAR.length; g++) {
      for (let i = 0; i < gramaticaT.estadosLRAR[g].variables.length; i++) {
        for (let f = 0; f < gramaticaT.estadosLRAR[g].variables[i].producciones.length; f++) {
          gramaticaT.estadosLRAR[g].variables[i].orden = i;
          gramaticaT.estadosLRAR[g].variables[i].producciones[f] = "." + gramaticaT.estadosLRAR[g].variables[i].producciones[f];
        }
      }
    }
    console.log(gramaticaT.variables[0].producciones);
    console.log(gramaticaT.estadosLRAR[0])
    for (let f = 0; f < gramaticaT.estadosLRAR[0].variables.length; f++) {
      console.log(gramaticaT.estadosLRAR[0].variables[f]);

    }

  }

  generarEstado0(gramaticaT: GramaticaT) {
    let estado = new EstadoT();
    estado.nombre = "l-0";
    estado.variables = gramaticaT.variables;
    estado.variables[0].producciones.push("$");//LA PRIMERA SIEMPRE LA ACOMPAÑA EL DOLAR

  }

  buscarPrimero(gramaticaT: GramaticaT, buscado: string): string[] {
    gramaticaT.primeros.forEach(element => {
      if (element.variable == buscado) {
        return element.produciones;
      }
    });
    return [];
  }

  buscarSiguiente(gramaticaT: GramaticaT, buscado: string): string[] {
    gramaticaT.siguientes.forEach(element => {
      if (element.variable == buscado) {
        return element.produciones;
      }
    });
    return [];
  }

  buscarSigue(variable: VariableT): string {
    variable.producciones.forEach(element => {
      let producionCaracter = element.split('');
      for (let i = 0; i < (producionCaracter.length - 1); i++) {
        if (producionCaracter[i] == ".") {
          return producionCaracter[i];
        }
      }
    });
    return "";
  }
  agregarDolar(gramaticaT: GramaticaT) {


  }

  funcionRecursiva(gramaticaT: GramaticaT) {

  }

  obtenerDespuesPunto(): string {
    return "";
  }

  existeEstado(estado: EstadoT): boolean {
    return false;
  }

}
