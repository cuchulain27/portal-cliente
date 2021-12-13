import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-cell-grid-brecha',
  templateUrl: './btn-cell-grid-brecha.component.html',
  styleUrls: ['./btn-cell-grid-brecha.component.css']
})
export class BtnCellGridBrechaComponent implements AgRendererComponent {

  refresh: any;
  public cellValue: string = '';
  constructor(private router:Router) {

  }

  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.cellValue = params.value;
  }

  buttonClicked() {
    this.router.navigateByUrl('/levantabrecha/'+this.cellValue);
  }

}
