import { /* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {ConjuntoPrediccion, Gramatica, Primeros, Siguientes} from '../models';
import {ConjuntoPrediccionT} from '../models/conjunto-prediccion-t.model';
import {GramaticaT} from '../models/gramatica-t.model';
import {PrimerosT} from '../models/primeros-t.model';
import {SiguientesT} from '../models/siguientes-t.model';
import {VariableT} from '../models/variable-t.model';
import {ConjuntoPrediccionRepository, GramaticaRepository, PrimerosRepository, ProduccionRepository, SiguientesRepository, VariableRepository} from '../repositories';
import {AnalizadorLr1Service} from '../services/analizador-lr1.service';
import {AnalizadorLrarService} from '../services/analizador-lrar.service';
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
    @repository(ConjuntoPrediccionRepository)
    public conjuntoPrediccionRepository: ConjuntoPrediccionRepository,
    @service(AnalizadorLr1Service)
    public servicioAnalizadorLR1: AnalizadorLr1Service,
    @service(AnalizadorLrarService)
    public servicioAnalizadorLRAR: AnalizadorLrarService,
  ) { }
  gramaticaanalizada: GramaticaT = new GramaticaT()
  /*
   * Add service methods here
   */
  async leerJson(ruta: string, direccion: string): Promise<GramaticaT> {
    console.log(direccion);

    let rawdata = fs.readFileSync(direccion + '/' + ruta);
    let student = JSON.parse(rawdata);
    //CREAMOS LA GRAMATICA
    let gramaticat: GramaticaT = new GramaticaT();
    gramaticat.nombre = student.nombre;
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
    await this.generarPrimeros(gramaticat);
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
          let cadenaInt = "";
          producionArray.forEach(simbolo => {
            if (!(this.tiene_Capital(simbolo)) && sinFin) {
              if (!cadenaInt.includes(simbolo))
                cadenaInt = cadenaInt + simbolo;

            }
            else {
              sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
            }
          });
          primero.produciones.push(cadenaInt);
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
                  if (!primero.produciones.includes(nuevo))
                    primero.produciones.push(nuevo);
                })
              }

            });
          });
        }
        else if (this.soloLamda(producion)) {//CUARTA CONDICION solo lamda
          primero.produciones.push("λ");
        }
        else if (producionArray[0] == "λ") {//TERCERA CONDICION
          let salida = true;
          producionArray.forEach(producionA => {
            if (producionA != "λ") {
              if (!(this.tiene_Capital(producionArray[1])) && salida) {
                let sinFin = true;
                let cadenaInt = "";
                producionArray.forEach(simbolo => {
                  if (!(this.tiene_Capital(simbolo)) && sinFin && simbolo != "") {
                    if (!primero.produciones.includes(simbolo))
                      cadenaInt = cadenaInt + simbolo;
                  }
                  else {
                    sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
                  }
                });
                primero.produciones.push(cadenaInt);
                salida = false;
              }
            }
          })

        }
      });

      gramaticaT.primeros.push(primero);
    });
    this.generarsiguientes(gramaticaT)
  }
  soloLamda(texto: String): boolean {
    let cantidad = 0;
    let cadena = texto.split("");
    for (let i = 0; i < texto.length; i++) {
      if (texto[i].toLowerCase() == "λ") {
        cantidad = cantidad + 1;
      }
    }
    if (cadena.length == cantidad) {
      return true;
    }
    else {
      return false;
    }
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
            let cadenaInt = "";
            producionArray.forEach(simbolo => {
              if (!(this.tiene_Capital(simbolo)) && sinFin) {
                if (!retorno.includes(simbolo))

                  cadenaInt = cadenaInt + simbolo;
              }
              else {
                sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
              }
            });
            retorno.push(cadenaInt);

          }
          else if ((this.tiene_Capital(producionArray[0]))) {//SEGUNDA CONDICION, CUANDO LA PRIMERA ES VARIABLE DE OTRA
            let buscada = producionArray[0];
            if (producionArray[1] == "'") {//EN caso de que la variable sea prima
              buscada = buscada + "'";
            }
            gramaticaT.variables.forEach((varibles: VariableT) => {
              varibles.producciones.forEach((producionI: String) => {
                if (producionI.includes((buscada))) {
                  let adquiridos = this.recursivaCase2(gramaticaT, buscada);
                  adquiridos.forEach(nuevo => {
                    if (!retorno.includes(nuevo))
                      retorno.push(nuevo);
                  })
                }

              });
            });
          }
          else if (this.soloLamda(producion)) {//CUARTA CONDICION
            retorno.push("λ");
          }
          else if (producionArray[0] == "λ") {//TERCERA CONDICION
            producionArray.forEach(producionA => {
              if (producionA != "λ") {
                if (!(this.tiene_Capital(producionArray[1]))) {
                  let sinFin = true;
                  let cadenaInt = "";
                  producionArray.forEach(simbolo => {
                    if (!(this.tiene_Capital(simbolo)) && sinFin && simbolo != "") {
                      if (!retorno.includes(simbolo))
                        cadenaInt = cadenaInt + simbolo;

                    }
                    else {
                      sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
                    }
                  });
                  retorno.push(cadenaInt);
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
    gramaticaT.variables.forEach(async (elemento: VariableT) => {//recorre variables para analizar uno a uno
      let siguiente: SiguientesT = new SiguientesT;
      siguiente.variable = elemento.variable;
      siguiente.produciones = [];
      if (contador == 0) {//Primera regla
        if (!siguiente.produciones.includes("$"))
          siguiente.produciones.push("$");
      }
      gramaticaT.variables.forEach(async (element: VariableT) => {//recorremos todas las variables para buscar la variable
        element.producciones.forEach(producion => {
          console.log(producion);

          let producionArray = producion.split('');

          if (producion.includes(elemento.variable) && !(producion.includes(elemento.variable + "'"))) {
            let posicionEncuentra = this.posicion(producion, elemento.variable);
            console.log(posicionEncuentra);
            if ((-2) != posicionEncuentra) {
              if ((-1) == posicionEncuentra || producionArray[posicionEncuentra] == "λ")//Cuarta condicion* si hay un -1 es por q es lamda lo q sigue
              {
                if (gramaticaT.siguientes[gramaticaT.siguientes.length - 1]) {
                  siguiente.produciones = gramaticaT.siguientes[gramaticaT.siguientes.length - 1].produciones;
                  console.log("check point 2" + siguiente.produciones);
                }

              }
              else if (!(this.tiene_Capital(producionArray[posicionEncuentra])))//TERCERA CONDICIÓN
              {
                let sinFin = true;
                let cadenaInt = "";
                for (let i = posicionEncuentra; i < producionArray.length; i++) {
                  if (!(this.tiene_Capital(producionArray[i])) && sinFin) {
                    if (!cadenaInt.includes(producionArray[i]) && producionArray[i] != "'")
                      cadenaInt = cadenaInt + producionArray[i];

                  }
                  else {
                    sinFin = false;
                  }

                }

                console.log("check point 1" + cadenaInt);

                siguiente.produciones.push(cadenaInt);
              }
              else {//Tercera Condicion
                console.log("check point 3 " + producionArray[posicionEncuentra]);
                let tmpPrim = [];
                let tmpNewPrim: string[] = [];
                if ((producionArray[posicionEncuentra + 1] == "'")) {
                  let buscar = producionArray[posicionEncuentra] + "'";
                  tmpPrim = this.buscarprimero(gramaticaT, buscar);
                }
                else {
                  tmpPrim = this.buscarprimero(gramaticaT, producionArray[posicionEncuentra]);
                }
                if (tmpPrim.includes("λ")) {
                  console.log("incluye λ");

                  tmpNewPrim = [];
                  tmpPrim.forEach(element => {
                    if (element != "λ") {
                      tmpNewPrim.push(element);
                    }
                  });
                  let tmpSig = this.buscarSiguiente(gramaticaT, producionArray[posicionEncuentra]);
                  tmpSig.forEach(element => {
                    tmpNewPrim.push(element);
                  });
                }
                else {
                  tmpNewPrim = tmpPrim;
                }
                if (tmpNewPrim != [])
                  siguiente.produciones = tmpNewPrim;
              }
            }



          }

        });
      });
      if (siguiente.produciones != [])//verifica que se haya añadido algo como minimo
      {gramaticaT.siguientes.push(siguiente);}
      contador++;
    });

    this.generarConjuntoPrediccion(gramaticaT);



  }
  posicion(cadenaLarga: string, cadena: string): number {
    let cLarga = cadenaLarga.split('');
    let cCorta = cadena.split('');
    for (let i = 0; i < cLarga.length; i++) {
      if (cLarga[i] == cCorta[0]) {
        if (cCorta.length == 2) {
          if (cLarga[i + 1] == cCorta[1]) {
            if ((i + 2) >= cLarga.length) {
              return -1;
            } else {
              return i + 2;
            }
          }
        }
        else {
          if ((i + 1) >= cLarga.length) {
            return -1;
          } else {
            return i + 1;
          }
        }
      }

    }

    return -2;
  }
  iniciaCon(cadenaLarga: string, cadena: string): boolean {//NO SE USA
    let cLarga = cadenaLarga.split('');
    let cCorta = cadena.split('');
    if ((cLarga[0] == cCorta[0] && cLarga[1] == cCorta[1]) || (cLarga[0] == cCorta[0] && cLarga[1] != "'"))
      return true
    return false;
  }

  generarConjuntoPrediccion(gramaticaT: GramaticaT) {

    gramaticaT.variables.forEach(async (element: VariableT) => {//Recorremos las variables para sacar el CP de cada una
      let cuenta = 0;
      element.producciones.forEach(producion => {
        let conjuntoPrediccionT: ConjuntoPrediccionT = new ConjuntoPrediccionT;//Generamos un CP por produccion
        conjuntoPrediccionT.variable = element.variable;
        conjuntoPrediccionT.producciones = [];

        let producionArray = producion.split('');//Segunda condicion
        if (producionArray[0] == "λ") {
          //meter condicion de lamda
          conjuntoPrediccionT.producciones = this.buscarSiguiente(gramaticaT, element.variable);//CP(A->λ)=sig(A)

        }
        else if (this.tiene_Capital(producionArray[0])) {//buscamos lo prim(A)
          let buscar = producionArray[0];
          if (producionArray[1] == "'") {//Para saber si la letra tiene ' para buscar correctamente
            buscar = buscar + producionArray[1];
          }
          conjuntoPrediccionT.producciones = this.buscarprimero(gramaticaT, buscar);
        }
        else {//Caso en que los prim son de una minuscula no una mayuscula
          let sinFin = true;


          producionArray.forEach(simbolo => {
            if (!(this.tiene_Capital(simbolo)) && sinFin) {
              if (!conjuntoPrediccionT.producciones.includes(simbolo))
                conjuntoPrediccionT.producciones.push(simbolo);
            }
            else {
              sinFin = false;//CUANDO DEJE DE EXISTIR LA MMINUSCULA SALGA
            }
          });
        }
        cuenta++;
        gramaticaT.conjuntoPrediccion.push(conjuntoPrediccionT);
      })

    });// λ
    gramaticaT.es = this.verificarPertenece(gramaticaT);
    console.log("Gramatica");
    console.log(gramaticaT);
    console.log("Primeros");
    console.log(gramaticaT.primeros);
    console.log("Siguientes");
    console.log(gramaticaT.siguientes);
    console.log("Conjunto Prediccion");
    console.log(gramaticaT.conjuntoPrediccion);
    if (gramaticaT.es) {
      console.log("La gramatrica si pertenece");
    } else {
      console.log("La gramatrica NO pertenece");
    }
    this.gramaticaanalizada = gramaticaT;
    let gramaticaLR1 = new GramaticaT();
    gramaticaLR1 = gramaticaT;
    let gramaticaLRAR = new GramaticaT();
    gramaticaLRAR = gramaticaT;
    this.servicioAnalizadorLR1.analizarLR1(gramaticaLR1);//analizamos si es lr1
    this.servicioAnalizadorLRAR.analizarLRAR(gramaticaLRAR);//analizamos si es lrar

  }
  buscarprimero(gramaticaT: GramaticaT, buscado: string): string[] {
    let retorno: string[] = [];
    gramaticaT.primeros.forEach(element => {
      console.log(element.variable + "comparable" + buscado);

      if (element.variable == buscado) {
        console.log(element.produciones);
        retorno = element.produciones;
      }
    })
    if (retorno == [])
      console.log("No se encontro  primero");

    return retorno;
  }
  buscarSiguiente(gramaticaT: GramaticaT, buscado: string): string[] {
    let retorno: string[] = [];
    gramaticaT.siguientes.forEach(element => {
      if (element.variable == buscado) {
        retorno = element.produciones;

      }

    })
    if (retorno == [])
      console.log("No se encontro  primero");

    return retorno;
  }
  verificarPertenece(gramaticaT: GramaticaT): boolean {
    let ultima = "";
    let pertenece = true;
    let tempProduciones: string[] = [];
    gramaticaT.conjuntoPrediccion.forEach(element => {
      if (ultima == element.variable) {
        tempProduciones.forEach(elemento => {
          if (element.producciones.includes(elemento)) {
            pertenece = false;
          }

        });

      }
      else {
        tempProduciones = [];
      }
    });
    if (pertenece) {
      this.guardarGramatica(gramaticaT);
    }
    return pertenece;
  }
  async guardarGramatica(gramaticaT: GramaticaT) {
    let gramaticaGuardar = new Gramatica();
    if (gramaticaT.nombre)
      gramaticaGuardar.Archivo = gramaticaT.nombre;
    let gramtica = await this.gramaticaRepository.create(gramaticaGuardar);
    gramaticaT.primeros.forEach(async element => {
      let primero = new Primeros();
      if (element.variable) {
        primero.Nombre = element.variable;
      }
      if (element.produciones) {
        let prod = "";
        element.produciones.forEach(elemento => {
          if (prod == "") {
            prod = prod + elemento;
          }
          else {
            prod = prod + ", " + elemento;
          }
        });
        primero.Produciones = prod;
      }
      if (gramtica.Id) {
        primero.Gramatica = gramtica.Id;
      }
      await this.primerosRepository.create(primero);
    });
    gramaticaT.siguientes.forEach(async element => {
      let siguiente = new Siguientes();
      if (element.variable) {
        siguiente.Nombre = element.variable;
      }
      if (element.produciones) {
        let prod = "";
        element.produciones.forEach(elemento => {
          if (prod == "") {
            prod = prod + elemento;
          }
          else {
            prod = prod + ", " + elemento;
          }
        });
        siguiente.Produciones = prod;
      }
      if (gramtica.Id) {
        siguiente.Gramatica = gramtica.Id;
      }
      await this.siguientesRepository.create(siguiente);

    });
    gramaticaT.conjuntoPrediccion.forEach(async element => {
      let cp = new ConjuntoPrediccion();
      if (element.variable) {
        cp.Nombre = element.variable;
      }
      if (element.producciones) {
        let prod = "";
        element.producciones.forEach(elemento => {
          if (prod == "") {
            prod = prod + elemento;
          }
          else {
            prod = prod + ", " + elemento;
          }
        });
        cp.Produciones = prod;
      }
      if (gramtica.Id) {
        cp.Gramatica = gramtica.Id;
      }
      await this.conjuntoPrediccionRepository.create(cp);

    });
    //this.primerosRepository.create()
  }
}
