import { Injectable } from '@angular/core';
import { updateFor } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class TransformacionesService {

  constructor() { }

  formatearRun(run: string): string {
    let runSinDV = run.substring(0, run.length - 1);
    let dv = run.substr(run.length - 1, 1);
    return new Intl.NumberFormat("es-CL").format(parseInt(runSinDV)) + '-' + dv;
  }

  formatearRunOnChange(run: string) {
    var runAux = run;
    if (runAux.length > 2) {
      runAux = runAux.replace(/\./g, "").replace(/\-/g, '');
      let cuerpo = runAux.slice(0, -1);
      let dv = runAux.slice(-1).toUpperCase();

      cuerpo = new Intl.NumberFormat("es-CL").format(parseInt(cuerpo));
      run = cuerpo + '-' + dv;
    }
    return run;
  }
}

