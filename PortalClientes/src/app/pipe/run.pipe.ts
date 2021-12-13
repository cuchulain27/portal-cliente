import { Pipe, PipeTransform } from '@angular/core';
import { parse } from 'path';

@Pipe({
  name: 'run'
})
export class RunPipe implements PipeTransform {

  transform(run: any | string, ...args: unknown[]): unknown {
    if (run != undefined) {
      let runSinDV = run.substring(0, run.length - 1);
      let dv = run.substr(run.length - 1, 1);
      return new Intl.NumberFormat("es-CL").format(parseInt(runSinDV)) + '-' + dv;
    } else {
      return "";
    }
  }

}
