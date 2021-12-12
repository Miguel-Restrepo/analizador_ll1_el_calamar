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
    gramaticaT.estadosLRAR.push(this.generarEstado(gramaticaT, gramaticaT.estadosLRAR[0].variables[0].variable, gramaticaT.estadosLRAR[0]));


  }

  generarEstado0(gramaticaT: GramaticaT) {
    let estado = new EstadoT();
    estado.nombre = "l-0";
    estado.variables = gramaticaT.variables;
    estado.variables[0].producciones.push("$");//LA PRIMERA SIEMPRE LA ACOMPAÑA EL DOLAR

  }

  funcionRecursivaSacaEstado(gramaticaT: GramaticaT, variable: string): EstadoT {
    let estado = new EstadoT();
    let variableT = new VariableT();
    variableT.variable = variable;
    variableT.producciones = this.obtenerProducionesPrimero(gramaticaT, variable);
    estado.variables.push(variableT);
    return estado;
  }
  obtenerProducionesPrimero(gramaticaT: GramaticaT, variable: string): string[] {//Funcion para optener las produciones
    let arregloProduciones: string[] = [];
    gramaticaT.variables.forEach(element => {
      if (element.variable == variable) {
        element.producciones.forEach(producion => {
          arregloProduciones.push("." + producion);
          let tmp = producion.split("");
          if (tmp.length == 1) {
            arregloProduciones.push("$");
          }
        });
        return element.producciones;
      }
    });
    return []
  }
  generarEstado(gramaticaT: GramaticaT, variable: string, estadoAnterior: EstadoT): EstadoT {
    let estado = new EstadoT();
    estado.variables=[]
    let variableT = new VariableT();
    variableT.variable = variable;
    variableT.producciones = [];
    estadoAnterior.variables.forEach(element => {
      if (element.variable == variable) {
        element.producciones.forEach(elemento => {
          let nuevaPro = this.moverPunto(elemento)
          variableT.producciones.push(nuevaPro);
          switch (this.despuesPunto(nuevaPro)) {
            case 1://Tiene mayuscula
              this.obtenerVariableT(gramaticaT, this.despuesPuntoEsp(nuevaPro), estadoAnterior, estado)
              break;
            case 2://Tiene minuscula
              variableT.producciones.push(this.despuesPuntoEsp(nuevaPro));
              break;
            case 3://Esta vacio

              break;
            default:
              break;
          }
        });
      }
    });
    estado.variables.push(variableT);
    return estado;
  }
  obtenerVariableT(gramaticaT: GramaticaT, variable: string, estadoAnterior: EstadoT, estadoActual: EstadoT) {
    let variableT = new VariableT();
    variableT.variable = variable;
    variableT.producciones = [];
    estadoAnterior.variables.forEach(element => {
      if (element.variable == variable) {
        element.producciones.forEach(elemento => {
          let nuevaPro = this.moverPunto(elemento)
          variableT.producciones.push(nuevaPro);
          switch (this.despuesPunto(nuevaPro)) {
            case 1://Tiene mayuscula
              this.obtenerVariableT(gramaticaT, this.despuesPuntoEsp(nuevaPro), estadoAnterior, estadoActual)
              break;
            case 2://Tiene minuscula
              variableT.producciones.push(this.despuesPuntoEsp(nuevaPro));
              break;
            case 3://Esta vacio
              variableT.producciones.push("$");
              break;
            default:
              break;
          }
        });
      }
    });
    estadoActual.variables.push(variableT);
  }
  despuesPuntoEsp(cadena: string): string {
    let caden = cadena.split('');
    for (let i = 0; i < caden.length - 1; i++) {
      if (caden[i] == ".") {
        if (this.tiene_Capital(caden[i + 1])) {
          return caden[i + 1];//Tiene una mayuscula
        }

      }


    }
    return "";
  }
  despuesPunto(cadena: string): number {
    let caden = cadena.split('');
    for (let i = 0; i < caden.length - 1; i++) {
      if (caden[i] == ".") {
        if (this.tiene_Capital(caden[i + 1])) {
          return 1;//Tiene una mayuscula
        }
        else {
          return 2;//Tiene una minuscula u algo mas
        }

      }


    }
    return 3;//Fin

  }
  moverPunto(cadena: string): string {//Me mueve un espacio el punto
    let caden = cadena.split('');
    let cadenaNueva = "";
    let contador = 0;
    caden.forEach(element => {
      contador = contador + 1;
      if (element == ".") {
        cadenaNueva = cadenaNueva + caden[contador];
      }
      else {
        cadenaNueva = cadenaNueva + element;
      }
    });
    return cadenaNueva;

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
  tiene_Capital(texto: String): boolean {
    let letras = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    for (let i = 0; i < texto.length; i++) {
      if (letras.indexOf(texto.charAt(i), 0) != -1) {
        return true;
      }
    }
    return false;
  }
  obtenerDespuesPunto(): string {
    return "";
  }

  existeEstado(estado: EstadoT): boolean {
    return false;
  }

}
