import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {ConjuntoPrediccionT} from '../models/conjunto-prediccion-t.model';
import {GramaticaT} from '../models/gramatica-t.model';
import {PrimerosT} from '../models/primeros-t.model';
import {SiguientesT} from '../models/siguientes-t.model';
import {VariableT} from '../models/variable-t.model';
import {GramaticaRepository, PrimerosRepository, ProduccionRepository, SiguientesRepository, VariableRepository} from '../repositories';
'use strict';
const fs = require('fs');
@injectable({scope: BindingScope.TRANSIENT})
export class AnalizadorLl1Service {
  constructor(/* Add @inject to inject parameters */
    @repository(VariableRepository)
    public variableRepository: VariableRepository,
    @repository(GramaticaRepository)
    public gramaticaRepository: GramaticaRepository,
    @repository(ProduccionRepository)
    public produccionRepository: ProduccionRepository,
    @repository(PrimerosRepository)
    public primerosRepository: PrimerosRepository,
    @repository(SiguientesRepository)
    public siguientesRepository: SiguientesRepository,
  ) { }
gramaticaanalizada: GramaticaT = new GramaticaT()
  /*
   * Add service methods here
   */
  async leerJson(ruta: string): Promise<GramaticaT> {
    let rawdata = fs.readFileSync('C:/Users/migue/Documents/Proyectos_Lenguajes/analizador_ll1_el_calamar/archivos/' + ruta);
    let student = JSON.parse(rawdata);
    //CREAMOS LA GRAMATICA
    let gramaticat: GramaticaT = new GramaticaT();
    gramaticat.siguientes = [];
    gramaticat.variables = [];
    gramaticat.conjuntoPrediccion = [];
    gramaticat.primeros = [];
    //RECORREMOS LAS VARIABLES CON SUS PRODUCCIONES
    student.Variables_produciones.forEach(async (Element: any) => {

      let varriable_producion = Element.split('->');//SEPARAMOS VARIABLE DE PRODUCIONES
      let variableT: VariableT = new VariableT();
      variableT.variable = varriable_producion[0];
      variableT.producciones = [];


      let produciones = varriable_producion[1].split(',');//SEPARAMOS LAS PRODUCCIONES POR LA COMA
      produciones.forEach(async (element: any) => {//RECORREMOS LAS PRODUCIONES
        variableT.producciones.push(element);
      });
      gramaticat.variables.push(variableT);

    });
    this.generarPrimeros(gramaticat);
    return this.gramaticaanalizada;
  }

  generarPrimeros(gramaticaT: GramaticaT) {
    gramaticaT.variables.forEach((element: VariableT) => {
      let primero: PrimerosT = new PrimerosT();//DECLARO EL PRIMEROS
      primero.variable = element.variable;
      primero.produciones = [];

      element.producciones.forEach((producion: String) => {
        let producionArray = producion.split('');
        if (!(this.tiene_Capital(producionArray[0])))//PRIMERA CONDICIÓN
        {
          let sinFin = true;
          producionArray.forEach(simbolo => {
            if (!(this.tiene_Capital(simbolo)) && sinFin) {
              primero.produciones.push(simbolo);
            }
            else {
              sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
            }
          });
        }
        else if ((this.tiene_Capital(producionArray[0]))) {//SEGUNDA CONDICION, CUANDO LA PRIMERA ES VARIABLE DE OTRA
          let buscada = producionArray[0];
          if (producionArray[1] == "'") {//EN caso de que la variable sea prima
            buscada = buscada + "'";
          }
          gramaticaT.variables.forEach((varibles: VariableT) => {
            varibles.producciones.forEach((producionI: String) => {
              if (producionI.includes((buscada))) {
                let adquiridos = this.recursivaCase2(gramaticaT, buscada)
                adquiridos.forEach(nuevo => {
                  primero.produciones.push(nuevo);
                })
              }

            });
          });
        }
        else if (producion = "") {//CUARTA CONDICION
          primero.produciones.push("");
        }
        else if (producionArray[0] == "") {//TERCERA CONDICION
          producionArray.forEach(producionA => {
            if (producionA != "") {
              if (!(this.tiene_Capital(producionArray[1]))) {
                let sinFin = true;
                producionArray.forEach(simbolo => {
                  if (!(this.tiene_Capital(simbolo)) && sinFin && simbolo != "") {
                    primero.produciones.push(simbolo);
                  }
                  else {
                    sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
                  }
                });
              }
            }
          })

        }
      });
      gramaticaT.primeros.push(primero);
    });
    this.generarsiguientes(gramaticaT)
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
  recursivaCase2(gramaticaT: GramaticaT, buscado: string): string[] {
    let retorno: string[] = [];
    gramaticaT.variables.forEach((element: VariableT) => {
      if (element.variable == buscado)//Pregunta si es la variable buscada
      {
        element.producciones.forEach((producion: string) => {
          let producionArray = producion.split('');
          if (!(this.tiene_Capital(producionArray[0])))//PRIMERA CONDICIÓN
          {
            let sinFin = true;
            producionArray.forEach(simbolo => {
              if (!(this.tiene_Capital(simbolo)) && sinFin) {
                retorno.push(simbolo);
              }
              else {
                sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
              }
            });
          }
          else if ((this.tiene_Capital(producionArray[0]))) {//SEGUNDA CONDICION, CUANDO LA PRIMERA ES VARIABLE DE OTRA
            let buscada = producionArray[0];
            if (producionArray[1] == "'") {//EN caso de que la variable sea prima
              buscada = buscada + "'";
            }
            gramaticaT.variables.forEach((varibles: VariableT) => {
              varibles.producciones.forEach((producionI: String) => {
                if (producionI.includes((buscada))) {
                  let adquiridos = this.recursivaCase2(gramaticaT, buscada)
                  adquiridos.forEach(nuevo => {
                    retorno.push(nuevo);
                  })
                }

              });
            });
          }
          else if (producion = "") {//CUARTA CONDICION
            retorno.push("");
          }
          else if (producionArray[0] == "") {//TERCERA CONDICION
            producionArray.forEach(producionA => {
              if (producionA != "") {
                if (!(this.tiene_Capital(producionArray[1]))) {
                  let sinFin = true;
                  producionArray.forEach(simbolo => {
                    if (!(this.tiene_Capital(simbolo)) && sinFin && simbolo != "") {
                      retorno.push(simbolo);
                    }
                    else {
                      sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
                    }
                  });
                }
              }
            })

          }

        })
      }

    })
    return retorno;
  }

  generarsiguientes(gramaticaT: GramaticaT) {
    let contador = 0;
    gramaticaT.variables.forEach(async (element: VariableT) => {
      let siguiente: SiguientesT = new SiguientesT;
      siguiente.produciones = [];
      siguiente.variable = element.variable;
      if (contador == 0) {
        siguiente.produciones.push("$");
      }
      contador++;
      element.producciones.forEach(producion => {
        if (this.iniciaCon(producion, element.variable)) {
          let tempprod = producion.split('');
          if (tempprod[1] == "'" && tempprod[2] == "") {
            gramaticaT.primeros[contador - 1].produciones.forEach(primerostmp => {
              siguiente.produciones.push(primerostmp);
            })

          }
          else if (tempprod[1] == "") {
            gramaticaT.primeros[contador - 1].produciones.forEach(primerostmp => {
              siguiente.produciones.push(primerostmp);
            })
          }
          else if (tempprod[1] != "'") {
            if (this.tiene_Capital(tempprod[1])) {//TERCERA REGLA
              gramaticaT.primeros.forEach(primero => {
                if (primero.variable == element.variable) {
                  element.producciones.forEach(nuevo => {
                    siguiente.produciones.push(nuevo);
                  })
                }
              })

            }
            else {
              let sinFin = true;
              let contadort = 0;
              tempprod.forEach(simbolo => {
                if (contadort > 0) {
                  if (!(this.tiene_Capital(simbolo)) && sinFin) {
                    siguiente.produciones.push(simbolo);
                  }
                  else {
                    sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
                  }

                }
                contadort++;

              });

            }


          } else {
            if (this.tiene_Capital(tempprod[1])) {//TERCERA REGLA
              gramaticaT.primeros.forEach(primero => {
                if (primero.variable == element.variable) {
                  element.producciones.forEach(nuevo => {
                    siguiente.produciones.push(nuevo);
                  })
                }
              })

            }
            else {
              let sinFin = true;
              let contadort = 0;
              tempprod.forEach(simbolo => {
                if (contadort > 1) {
                  if (!(this.tiene_Capital(simbolo)) && sinFin) {
                    siguiente.produciones.push(simbolo);
                  }
                  else {
                    sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
                  }

                }
                contadort++;

              });

            }

          }

        }

      });
      gramaticaT.siguientes.push(siguiente);
    });

    this.generarConjuntoPrediccion(gramaticaT);



  }
  iniciaCon(cadenaLarga: string, cadena: string): boolean {
    let cLarga = cadenaLarga.split('');
    let cCorta = cadena.split('');
    if ((cLarga[0] == cCorta[0] && cLarga[1] == cCorta[1]) || (cLarga[0] == cCorta[0] && cLarga[1] != "'"))
      return true
    return false;
  }

  generarConjuntoPrediccion(gramaticaT: GramaticaT) {

    gramaticaT.variables.forEach(async (element: VariableT) => {
      let conjuntoPrediccionT: ConjuntoPrediccionT = new ConjuntoPrediccionT;
      conjuntoPrediccionT.variable = element.variable;
      conjuntoPrediccionT.producciones = [];
      let cuenta = 0;
      element.producciones.forEach(producion => {

        let producionArray = producion.split('');
        if (producionArray[0] == "") {
          //meter condicion de lamda

        }
        else if (this.tiene_Capital(producionArray[0])) {
          let buscar = producionArray[0];
          if (producionArray[1] == "'") {
            buscar = buscar + producionArray[1];
            conjuntoPrediccionT.producciones = this.buscarprimero(gramaticaT, buscar);
          }
        }
        else {
          let sinFin = true;
          producionArray.forEach(simbolo => {
            if (!(this.tiene_Capital(simbolo)) && sinFin) {
              conjuntoPrediccionT.producciones.push(simbolo);
            }
            else {
              sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
            }
          });
        }
        cuenta++;
      })
      gramaticaT.conjuntoPrediccion.push(conjuntoPrediccionT);
    });
    console.log("Gramatica");
    console.log(gramaticaT);
    console.log("Primeros");
    console.log(gramaticaT.primeros);
    console.log("Siguientes");
    console.log(gramaticaT.siguientes);
    console.log("Conjunto Prediccion");
    console.log(gramaticaT.conjuntoPrediccion);
    this.gramaticaanalizada=gramaticaT;

  }
  buscarprimero(gramaticaT: GramaticaT, buscado: string): string[] {
    gramaticaT.siguientes.forEach(element => {
      if (element.variable == buscado)
        return element.produciones;
    })
    return [];
  }

}
