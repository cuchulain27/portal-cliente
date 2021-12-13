import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
@Component({
  selector: 'app-btn-cell-grid',
  templateUrl: './btn-cell-grid.component.html',
  styleUrls: ['./btn-cell-grid.component.css']
})
export class BtnCellGridComponent implements AgRendererComponent {
  refresh: any;
  public cellValue: string = '';
  public urlInforme = 'https://portal.mgcertifica.cl/informes/';

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {

    this.cellValue = params.value;
  }

  buttonClicked() {
    let href = this.urlInforme + 'f' + this.cellValue + '.pdf';
    this.cellValue != null ? window.open(href, "_blank") : alert('Proceso sin informe');
  }

}
