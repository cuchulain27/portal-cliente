import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Brechas } from 'src/app/models/Brechas';
import { InformeLevantamientoOut } from 'src/app/models/InformeLevantamiento';
import { Levantamiento } from 'src/app/models/LevantamientoBrecha';
import { Otec } from 'src/app/models/Otec';
import template, { nuevaPagina, tablaBrechaconocimiento, tablaBrechaDocumental, tablaBrechaPractica, tablaBrechasGeneral } from 'src/app/models/PlantillaLevantamiento';
import { ResultadoProceso } from 'src/app/models/ResultadoProceso';
import { SharePointFile } from 'src/app/models/SharePointFile';
import { AppToastServiceService } from 'src/app/services/app-toast-service.service';
import { LevantaBrechaService } from 'src/app/services/levanta-brecha.service';
import { TransformacionesService } from 'src/app/services/transformaciones.service';


@Component({
  selector: 'app-levanta-brecha',
  templateUrl: './levanta-brecha.component.html',
  styleUrls: ['./levanta-brecha.component.css']
})
export class LevantaBrechaComponent implements OnInit {

  public idEvaluacion: number = 0;
  resultado: ResultadoProceso = new ResultadoProceso();
  resBrechas: Brechas = new Brechas();
  public estado: boolean = false;
  public tratamiento: string = "otec";
  public detTratamiento: string = "";
  public otec: Otec = new Otec();
  public levanta: Levantamiento = new Levantamiento();
  public archivo: SharePointFile = new SharePointFile();
  public habilitaInforme: boolean = false;


  constructor(private levantaBrechaService: LevantaBrechaService, private route: ActivatedRoute, private router: Router, private appToast: AppToastServiceService,private transforma:TransformacionesService) {
  }

  ngOnInit(): void {
    moment.locale("es-mx");
    if (!isNaN(parseInt('' + this.route.snapshot.paramMap.get('id')))) {
      this.idEvaluacion = parseInt('' + this.route.snapshot.paramMap.get('id'));
      this.cargaData();
    } else {
      this.router.navigateByUrl('/cierrabrechas');
    }
  }

  cargaData() {
    this.levantaBrechaService.getDataProceso(this.idEvaluacion).then(
      res => {
        if (res.status) {
          this.resultado = res.data;
        }
        this.estado = res.status;
      }
    );

    this.levantaBrechaService.getBrechasProceso(this.idEvaluacion).then(
      res => {
        if (res.status) {
          this.resBrechas = res.data;
          let total = 0;
          let cuenta = 0;
          total += this.resBrechas.brechaEi.length;
          total += this.resBrechas.brechaPct.length;
          total += this.resBrechas.brechaProt.length;

          this.resBrechas.brechaEi.forEach(element => {
            if (element.idDocumento > 0) {
              element.disabled = true;
              element.checked = true;
              cuenta++;
            }
          });
          this.resBrechas.brechaPct.forEach(element => {
            if (element.idDocumento > 0) {
              element.disabled = true;
              element.checked = true;
              cuenta++;
            }
          });
          this.resBrechas.brechaProt.forEach(element => {
            if (element.idDocumento > 0) {
              element.disabled = true;
              element.checked = true;
              cuenta++;
            }
          });
          if (total == cuenta) {
            this.habilitaInforme = true;
          }
        }
        this.estado = res.status;
      }
    );

  }

  onFileSelected(event: any) {
    //var file = document.querySelector('#files > input[type="file"]').files[0];
    this.getBase64(event.target.files[0]).then(base64 => {
      this.archivo.libreria = 3;
      this.archivo.attName = this.idEvaluacion + "_" + event.target.files[0].name
      this.archivo.att = "" + base64;
    });
  }

  getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  setBase64(informe: InformeLevantamientoOut) {
    let byteArray = new Uint8Array(atob(informe.archivoB64).split('').map(char => char.charCodeAt(0)));
    let blob = new Blob([byteArray], { type: 'application/pdf' });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = informe.archivoName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  fnGuardar() {
    if (this.archivo.libreria >= 0) {
      let cuenta = 0;
      cuenta += this.resBrechas.brechaEi.filter(x => x.checked && !x.disabled).length;
      cuenta += this.resBrechas.brechaPct.filter(x => x.checked && !x.disabled).length;
      cuenta += this.resBrechas.brechaProt.filter(x => x.checked && !x.disabled).length;

      if (cuenta > 0) {
        this.guardaArchivo();
      } else {
        this.appToast.error("Debe seleccionar al menos una brecha");
      }
    } else {
      this.appToast.error("Debe seleccionar un archivo para levantar la brecha");
    }
  }

  fnGeneraInforme() {
    let temp = template;
    temp = temp.replace("[FECHA_INFORME]", moment().format('LL'));
    temp = temp.replace("[RUN_CANDIDATO]", this.transforma.formatearRun(this.resultado.runCandidato));
    temp = temp.replace("[NOMBRE_CANDIDATO]", this.resultado.nombreCandidato);
    temp = temp.replace("[GLS_EMPRESA]", this.resultado.nombreCliente);
    temp = temp.replace("[FAENA]", this.resultado.nombreFaena);
    temp = temp.replace("[PORC_PCT]", this.resultado.porcPct.toString() + " %");
    temp = temp.replace("[PORC_PROT]", this.resultado.porcProt.toString() + " %");
    temp = temp.replace("[FECHA_VIGENCIA]", moment(this.resultado.fechaVigenciaInforme).format("DD/MM/YYYY"));
    temp = temp.replace("[GLS_PERFIL]", this.resultado.perfil);
    temp = temp.replace("[GLS_EQUIPO]", this.resultado.modelo);

    let TablaBrecha1= tablaBrechasGeneral;
    let TablaBrecha2=tablaBrechasGeneral;
    let paginaNueva=nuevaPagina;
    let esNuevaPagina:boolean=false;

    if(this.resBrechas.brechaEi.length == 0){
      TablaBrecha1 += tablaBrechaDocumental.replace("[BrechasDocumentales]", this.generaBrechaInforme(this.resBrechas.brechaEi));
    }else{
      esNuevaPagina=true;
      TablaBrecha2 += tablaBrechaDocumental.replace("[BrechasDocumentales]", this.generaBrechaInforme(this.resBrechas.brechaEi));
    }
    if(this.resBrechas.brechaPct.length == 0){
      TablaBrecha1 += tablaBrechaconocimiento.replace("[BrechasConocimiento]", this.generaBrechaInforme(this.resBrechas.brechaPct));
    }else{
      esNuevaPagina=true;
      TablaBrecha2 += tablaBrechaconocimiento.replace("[BrechasConocimiento]", this.generaBrechaInforme(this.resBrechas.brechaPct));
    }
    if(this.resBrechas.brechaProt.length == 0){
      TablaBrecha1 += tablaBrechaPractica.replace("[BrechasPracticas]", this.generaBrechaInforme(this.resBrechas.brechaProt));
    }else{
      esNuevaPagina=true;
      TablaBrecha2 += tablaBrechaPractica.replace("[BrechasPracticas]", this.generaBrechaInforme(this.resBrechas.brechaProt));
    }

    temp = temp.replace("[TablaBrecha1]", TablaBrecha1);
    paginaNueva=paginaNueva.replace("[TablaBrecha2]", TablaBrecha2);
    if(esNuevaPagina) temp=temp.replace("[NuevaPagina]", paginaNueva);

    this.levantaBrechaService.postInformeLevantamiento({ idEvaluacion: this.idEvaluacion, htmlDocument: temp }).then(
      res => {
        this.setBase64(res.data);
      }
    )


  }

  generaBrechaInforme(brecha: any) {
    let salida = "";
    if (brecha.length > 0) {
      brecha.forEach((b: any) => {
        let fila = "<tr>";
        fila += "<td style='text-align: left; width: 50%;'>" + b.glsBrecha + "</td>";
        fila += "<td style='width: 10%;'>Tratada</td>";
        fila += "<td style='width: 10%;'>" + b.documento.medioTratamiento + "</td>";
        fila += "<td style='width: 10%;'>Si</td>";
        fila += "</tr>";
        salida += fila;
      });
    } else {
      let fila = "<tr>";
      fila += "<td colspan=4>Candidato no posee Brechas</td>";
      fila += "</tr>";
      salida += fila;
    }
    return salida;
  }

  guardaArchivo() {
    this.levantaBrechaService.postSubeDocumento(this.archivo).then(
      res => {
        this.levanta.rutaDocumento = res.data.archivoRuta;
        this.guardaBrechas();
      });
  }

  guardaBrechas() {
    this.levanta.idEvaluacion = this.idEvaluacion;
    this.levanta.tratamiento = this.tratamiento;
    this.levanta.entidad = this.detTratamiento;
    this.levanta.nombreArchivo = this.archivo.attName;
    this.resBrechas.brechaEi.forEach(element => {
      if ((element.idDocumento == 0 || element.idDocumento == null) && element.checked) {
        this.levanta.brechas.push({ idBrecha: element.id, tipoBrecha: "EI" });
      }
    });
    this.resBrechas.brechaPct.forEach(element => {
      if ((element.idDocumento == 0 || element.idDocumento == null) && element.checked) {
        this.levanta.brechas.push({ idBrecha: element.id, tipoBrecha: "PCT" });
      }
    });
    this.resBrechas.brechaProt.forEach(element => {
      if ((element.idDocumento == 0 || element.idDocumento == null) && element.checked) {
        this.levanta.brechas.push({ idBrecha: element.id, tipoBrecha: "PROT" });
      }
    });
    this.levantaBrechaService.postDocumentoBrechas(this.levanta).then(
      res => {
        this.appToast.success("Brechas Levantadas correctamente");
        this.cargaData();
      });
  }

  sellAllBrechas() {
    this.resBrechas.brechaEi.forEach(element => {
      if (!element.disabled) {
        element.checked = true;
      }
    });
    this.resBrechas.brechaPct.forEach(element => {
      if (!element.disabled) {
        element.checked = true;
      }
    });
    this.resBrechas.brechaProt.forEach(element => {
      if (!element.disabled) {
        element.checked = true;
      }
    });
  }

}
