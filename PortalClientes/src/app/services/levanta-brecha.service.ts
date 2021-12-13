import { Injectable } from '@angular/core';
import { InformeLevantamientoIn } from '../models/InformeLevantamiento';
import { Levantamiento } from '../models/LevantamientoBrecha';
import { SharePointFile } from '../models/SharePointFile';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class LevantaBrechaService {

  constructor(private genericService: GenericService) {
    this.genericService = genericService;
  }

  public controller = 'Brecha/';

  async getDataProceso(procesoRequest: number) {
    let json;
    try {
      let salida = await this.genericService.Get(this.controller + "getDataProcesoByIdEvaluacion/", procesoRequest);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

  async getBrechasProceso(procesoRequest: number) {
    let json;
    try {
      let salida = await this.genericService.Get(this.controller + "getDataBrechasByIdEvaluacion/", procesoRequest);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

  async postSubeDocumento(docBrechas: SharePointFile) {
    let json;
    try {
      let salida = await this.genericService.Post(this.controller + "postSubeArchivo/", docBrechas);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

  async postDocumentoBrechas(docBrechas: Levantamiento) {
    let json;
    try {
      let salida = await this.genericService.Post(this.controller + "postAsignaLevantamiento/", docBrechas);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

  async postInformeLevantamiento(informe: InformeLevantamientoIn) {
    let json;
    try {
      let salida = await this.genericService.Post(this.controller + "postGenerateInformeLevantamiento/", informe);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

}
