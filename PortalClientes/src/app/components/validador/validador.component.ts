import { ResultadoProceso } from './../../models/ResultadoProceso';
import { CompartidosService } from './../../services/compartidos.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-validador',
  templateUrl: './validador.component.html',
  styleUrls: ['./validador.component.css']
})
export class ValidadorComponent implements OnInit {
  @ViewChild('dvResultado')
  dvReusltado!: ElementRef;
  public folio: number = 0;
  proceso: ResultadoProceso = new ResultadoProceso();
  public estado: boolean = false;

  constructor(private sharedService: CompartidosService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!isNaN(parseInt(params['folio']))) {
        this.folio = params['folio'];
        this.onClickValidar();
      }
    });
  }


  onClickValidar() {
    this.folio = (this.folio == null) ? 0 : this.folio;
    this.sharedService.validarInformePorFolio(this.folio).then(
      res => {
        if (res.status) {
          this.proceso = res.data;
        }
        this.estado = res.status;
        const dvRest = this.dvReusltado.nativeElement;
        dvRest.classList.remove('d-none');
      }
    )
  }
}
