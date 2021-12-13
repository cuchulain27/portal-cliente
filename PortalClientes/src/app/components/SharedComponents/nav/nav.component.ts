import { RespuestaService } from './../../../services/respuesta.service';
import { LoginService } from './../../../services/login.service';
import { UsuarioPortal } from './../../../models/UsuarioPortal';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public usuario: UsuarioPortal = new UsuarioPortal();
  public url: string = '';
  constructor(private router: Router, private loginService: LoginService, private resService: RespuestaService) {
    console.log();
    if (localStorage.getItem('data') != null) {
      this.usuario = JSON.parse(localStorage.getItem('data') + '');
      this.url = this.usuario.urlServicio;
    }

  }

  ngOnInit(): void {
    this.resService.disparador.subscribe(res => {
      if (res.status) {
        this.usuario = res.data.usuario;
        this.url = this.usuario.urlServicio;
        
      }
    })

  }



  revisaRutaLogin() {
    let paso=this.router.url.split('?')[0];
    switch (paso) {
      case '/login':
        return false

      case '/validador':
        document.getElementById('btnLogOut')?.classList.add('d-none');
        break;

      default:
        break;
    }
    return true;
  }

  public logOut() {
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }



}
