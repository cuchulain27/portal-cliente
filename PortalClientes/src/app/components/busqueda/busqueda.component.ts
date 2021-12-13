import { TransformacionesService } from './../../services/transformaciones.service';

//servicios
import { ZipService } from './../../services/zip.service';
import { ProcesoService } from 'src/app/services/proceso.service';
import { CompartidosService } from 'src/app/services/compartidos.service';
//modelos
import { EstadoProceso } from './../../models/EstadoProceso';
import { ResultadoProceso } from './../../models/ResultadoProceso';
import { UsuarioPortal } from './../../models/UsuarioPortal';
import { ProcesoIn } from './../../models/ProcesoIn';
import { Clientes } from './../../models/Clientes';

//modulos
import { BtnCellGridComponent } from './../btn-cell-grid/btn-cell-grid.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  @ViewChild('run')
  runCandidato!: ElementRef;

  public usuario: UsuarioPortal;
  public procesoModel: ProcesoIn;
  public resultadoProcesoModel: ResultadoProceso;
  public listClientes: Clientes[];
  public gridApi: any;
  public gridColumnApi: any;
  public frameworkComponents = {
    btnCell: BtnCellGridComponent
  }
  public resumen: { total: number; porVencer: number; vencidos: number; acreditados: number, reprobados: number; sinInformes: number; };
  public estadoProceso: EstadoProceso[] = [];
  columnDefs = [
    {
      headerName: 'descarga',
      field: 'idInforme',
      width: 75,
      cellRenderer: 'btnCell',
      headerComponentParams: { template: '<i style="margin-left:15px;" class="fas fa-download"></i>' },
    },
    { field: "nombreCandidato" },
    { field: "runCandidato", valueFormatter: (data: { value: string }) => this.formatearRun(data.value) },

    { field: "tipoProceso" },
    { field: "estado" },
    { field: "idEstado", hide: true },
    { field: "fechaInforme ", type: 'date', valueFormatter: this.dateFormatter },
    { field: "idResultado", hide: true },
    { field: "descResultado", headerName: 'Resultado' },
    { field: "idInforme", hide: true },
    { field: "conFirma", hide: true },
    { field: "rutCliente", hide: true },
    { field: "mesesVigencia", headerName: 'Fecha vigencia', valueFormatter: this.dateFormatterExpiracion },
    // { field: "idCliente" },
    { field: "perfil" },
    { field: "equipo", hide: true },
    { field: "modelo" },
    { field: "idEvaluacion", width: 'auto', },
    { field: "zonaFaena", width: 150 },
    {
      field: "conProt", cellRenderer: (params: { value: any; }) => {
        return params.value ? `<i class="fas fa-check"></i>` : `<i class="fas fa-times"></i>`;
      }, width: 110,
    },
    {
      field: "conPct", cellRenderer: (params: { value: any; }) => {
        return params.value ? `<i class="fas fa-check"></i>` : `<i class="fas fa-times"></i>`;
      }, width: 110,
    },
    {
      field: "vigencia", cellRenderer: (params: { value: any; }) => {
        switch (params.value) {
          case 'vigente':
            return `<i class="fas fa-check text-success"></i>`;
          case 'por vencer':
            return `<i class="fas fa-check text-warning"></i>`;
          case 'vencido':
            return `<i class="fas fa-times text-danger"></i>`;
          default:
            return 'Sin informe';
        }
      }
    }
  ];

  defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };
  rowData = [];
  LOCALE = { page: 'Pagina', more: 'Mas', to: 'a', of: 'de', next: 'Siguente', last: 'Último', first: 'Primero', previous: 'Anteror', loadingOoo: 'Cargando...', selectAll: 'Seleccionar Todo', searchOoo: 'Buscar...', blanks: 'En blanco', filterOoo: 'Filtrar', applyFilter: 'Aplicar Filtro...', equals: 'Igual', notEqual: 'No Igual', lessThan: 'Menos que', greaterThan: 'Mayor que', lessThanOrEqual: 'Menos o igual que', greaterThanOrEqual: 'Mayor o igual que', inRange: 'En rango de', contains: 'Contiene', notContains: 'No contiene', startsWith: 'Empieza con', endsWith: 'Termina con', andCondition: 'Y', orCondition: 'O', group: 'Grupo', columns: 'Columnas', filters: 'Filtros', valueColumns: 'Valos de las Columnas', pivotMode: 'Modo Pivote', groups: 'Grupos', values: 'Valores', pivots: 'Pivotes', toolPanelButton: 'BotonDelPanelDeHerramientas', noRowsToShow: 'No hay filas para mostrar', pinColumn: 'Columna Pin', valueAggregation: 'Agregar valor', autosizeThiscolumn: 'Autoajustar esta columna', autosizeAllColumns: 'Ajustar todas las columnas', groupBy: 'agrupar', ungroupBy: 'desagrupar', resetColumns: 'Reiniciar Columnas', expandAll: 'Expandir todo', collapseAll: 'Colapsar todo', toolPanel: 'Panel de Herramientas', export: 'Exportar', csvExport: 'Exportar a CSV', excelExport: 'Exportar a Excel (.xlsx)', excelXmlExport: 'Exportar a Excel (.xml)', pinLeft: 'Pin Izquierdo', pinRight: 'Pin Derecho', sum: 'Suman', min: 'Minimo', max: 'Maximo', none: 'nada', count: 'contar', average: 'promedio', copy: 'Copiar', copyWithHeaders: 'Copiar con cabeceras', paste: 'Pegar' };


  constructor(private router: Router, private procesoService: ProcesoService, private zip: ZipService, private compartidosService: CompartidosService,
    private transforma: TransformacionesService) {
    this.usuario = new UsuarioPortal();
    this.procesoModel = new ProcesoIn();
    this.resultadoProcesoModel = new ResultadoProceso();
    this.resumen = { total: 0, porVencer: 0, vencidos: 0, acreditados: 0, reprobados: 0, sinInformes: 0 }
    this.listClientes = [];
  }

  ngOnInit(): void {
    this.verificaSesion();
    this.buscarProceso();
    this.cargarEstados();
    this.cargarClientes();
  }


  verificaSesion() {
    let token = localStorage.getItem('id_token');
    if (!token) {
      this.router.navigateByUrl('/login');
    }
    let salida = localStorage.getItem('data');
    this.usuario = typeof salida === 'string' ? JSON.parse(salida) : null;
  }

  buscarProceso() {

    if (this.usuario.idCliente != '83') {
      this.procesoModel.idCliente = this.usuario.idCliente + '';
    }
    this.procesoModel.runCandidato = this.procesoModel.runCandidato?.replace(/\./g, "").replace(/\-/g, '');
    // this.procesoModel.zonaFaena=this.usuario.zona==null ?t
    this.procesoService.getProceso(this.procesoModel)
      .then(res => {
        this.resultadoProcesoModel = res;
        this.rowData = res;
        this.cargarResumen();
      });
  }


  dateFormatter(params: any) {

    let fecha = params.data.fechaInforme != null ? moment(params.data.fechaInforme).format('DD/MM/yyyy') : 'Sin informe';
    return fecha;
  }

  dateFormatterExpiracion(params: any) {

    let fecha = params.data.fechaVigenciaInforme != null ? moment(params.data.fechaVigenciaInforme).format('DD/MM/yyyy') : 'Sin informe';
    return fecha;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

  onBtnExport() {

    this.gridApi.exportDataAsCsv(this.gridApi);
  }
  onbtnDescargarTodo() {
    //console.log(this.rowData);
    let datos: string[] = [];
    // this.cargarResumen();
    this.rowData.forEach(proceso => {
      let dato;
      dato = (JSON.parse(JSON.stringify(proceso)));
      datos.push(dato.idInforme);
    })
    this.zip.descargarTodo(datos);

    // 

  }
  cargarResumen() {
    // console.log(this.rowData);
    this.resumen = {
      total: this.rowData.length,
      porVencer: this.rowData.filter(fila => JSON.parse(JSON.stringify(fila)).vigencia == 'por vencer').length,
      vencidos: this.rowData.filter(fila => JSON.parse(JSON.stringify(fila)).vigencia == 'vencido').length,
      acreditados: this.rowData.filter(fila => JSON.parse(JSON.stringify(fila)).idResultado == 1).length,
      reprobados: this.rowData.filter(fila => JSON.parse(JSON.stringify(fila)).idResultado > 1).length,
      sinInformes: this.rowData.filter(fila => JSON.parse(JSON.stringify(fila)).idEstado < 8).length
    }
  }

  cargarEstados() {
    this.compartidosService.getAllEstadoProceso()
      .then(data => {
        this.estadoProceso = data;
      });
  }

  formatearRun(run: string) {
    return this.transforma.formatearRun(run);
  }


  onChangeRun(run: string): string {
    const asRun = this.runCandidato.nativeElement;
    this.procesoModel.runCandidato = this.transforma.formatearRunOnChange(run);
    return this.procesoModel.runCandidato;
    //this.renderer2.setValue(asRun, this.transforma.formatearRunOnChange(run));
  }


  cargarClientes() {
    this.compartidosService.getAllClientes().then(data => this.listClientes = data);

  }
}
