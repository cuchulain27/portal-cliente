import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ProcesoIn } from '../models/ProcesoIn';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  constructor(private genericService: GenericService) {
    this.genericService = genericService;
  }

  public controller = 'Proceso/';
  async getProceso(procesoRequest: ProcesoIn) {
    let json;
    try {
      let salida = await this.genericService.Get(this.controller, procesoRequest);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }
  
}
