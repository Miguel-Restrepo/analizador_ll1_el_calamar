import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {keys as llaves} from '../config/keys';
export class CargaArchivoController {
  constructor(
  ) { }

  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }
  // SUBIR ARCHIVOS PLANOS PARA EL RECIBO DEL CLIENTE
  /**
  *
  * @param response
  * @param request
  */
  @post('/CargarGramatica', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función para la carga de una gramatica desde un archivo plano.',
      },
    },
  })
  async gramaticaPlano(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutagramaticaPlano = path.join(__dirname, llaves.carpetaGramaticas);
    let res = await this.SubirArchivoPlano(rutagramaticaPlano, llaves.nombreCampoGramatica, request, response, llaves.extensionesPermitidasGramatica);
    if (res) {
      if (response.req.file) {
        const nombre_archivo = response.req?.file.filename;
        if (nombre_archivo) {
          return {filename: nombre_archivo};
        }
      }

    }
    return res;
  }

  /**
     * store the file in a specific path
     * @param storePath
     * @param request
     * @param response
     */
  private SubirArchivoPlano(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo plano no es valido.'));
        },
        limits: {
          //fileSize: llaves.tamMaxImagenProyecto//LIMITE DEL PDF
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}