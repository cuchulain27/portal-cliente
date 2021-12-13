import { TransformacionesService } from './../../services/transformaciones.service';
import { AppToastServiceService } from './../../services/app-toast-service.service';
import { RespuestaService } from './../../services/respuesta.service';
import { LoginService } from './../../services/login.service';
import { LoginPortal } from 'src/app/models/LoginPortal';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginPortal: LoginPortal = { rutCliente: '', rutUsuario: '' };
  respuesta: { data: { message: string }; status: boolean; };
  usuarioTablero: boolean;

  @ViewChild('run')
  inputRunUsuario!: ElementRef;
  @ViewChild('rut')
  inputRutEmpresa!: ElementRef;

  constructor(private loginService: LoginService, private resService: RespuestaService,
    private router: Router, private appToast: AppToastServiceService, private transforma: TransformacionesService, private route: ActivatedRoute) {
    this.respuesta = { data: { message: '' }, status: false };
    this.usuarioTablero = false;

  }

  ngAfterViewInit() {

  }



  ngOnInit(): void {
    this.verificaSesion();
    this.verificaRuta();

    this.resService.disparador.subscribe(res => {
      if (res.status) {
        localStorage.setItem('data', JSON.stringify(res.data.usuario));
        if (this.usuarioTablero) {
          this.router.navigateByUrl('/serviciosasociados');
        }else {
          this.router.navigateByUrl('/busqueda');
        }
      } else {
        this.respuesta.data.message = res.data.message;
        this.appToast.error(this.respuesta.data.message);
      }
    })

  }
  verificaRuta() {
    this.route.queryParams.subscribe(params => {
      if (!isNaN(parseInt(params['tablero']))) {
        this.usuarioTablero = true;
      } else {
        this.usuarioTablero = false;
      }
    });

  }
  iniciarSesion() {
    this.loginPortal.rutUsuario = this.loginPortal.rutUsuario.replace(/\./g, "").replace(/\-/g, '').toUpperCase();
    this.loginPortal.rutCliente = this.loginPortal.rutCliente.replace(/\./g, "").replace(/\-/g, '').toUpperCase();
    this.loginService.preLogin(this.loginPortal)
      .then(salida => {
        this.respuesta = salida;
        this.respuesta.status ? this.appToast.info(this.respuesta.data.message) : this.appToast.error(this.respuesta.data.message);
      });

  }

  verificaSesion() {
    let token = localStorage.getItem('id_token')
    if (token) {
      this.router.navigateByUrl('/busqueda');
    }


  }

  onChangeRun(run: string): string {
    const asRun = this.inputRunUsuario.nativeElement;
    this.loginPortal.rutUsuario = this.transforma.formatearRunOnChange(run);
    return this.loginPortal.rutUsuario
    //this.renderer2.setValue(asRun, this.transforma.formatearRunOnChange(run));
  }

  onChangeRut(run: string): string {
    const asRut = this.inputRutEmpresa.nativeElement;
    this.loginPortal.rutCliente = this.transforma.formatearRunOnChange(run);
    return this.loginPortal.rutCliente;
    //this.renderer2.setValue(asRun, this.transforma.formatearRunOnChange(run));
  }
}
