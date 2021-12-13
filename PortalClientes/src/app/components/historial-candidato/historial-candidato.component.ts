import { HistoricoCandidato } from './../../models/HistoricoCandidato';
import { ActivatedRoute } from '@angular/router';
import { CompartidosService } from 'src/app/services/compartidos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-candidato',
  templateUrl: './historial-candidato.component.html',
  styleUrls: ['./historial-candidato.component.css']
})
export class HistorialCandidatoComponent implements OnInit {
  historiaCandidato: HistoricoCandidato = new HistoricoCandidato;
  constructor(private sharedService: CompartidosService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      console.log(params)
      if (params.hash != undefined) {
        const hash = params.hash;
        this.sharedService.historicoPorHash(hash)
          .then(results => {
            if (results.data) {
              this.historiaCandidato=results.data;
            } else {
          
              console.log(results, this.historiaCandidato);
            }
            console.log(this.historiaCandidato)
          })

      }
    }

    )
  }



}
