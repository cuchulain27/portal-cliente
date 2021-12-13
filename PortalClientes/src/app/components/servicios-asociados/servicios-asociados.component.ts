import { Router } from '@angular/router';
import { AppToastServiceService } from './../../services/app-toast-service.service';
import { UsuarioPortal } from './../../models/UsuarioPortal';
import { AfterViewInit, Component, ElementRef,  OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-servicios-asociados',
  templateUrl: './servicios-asociados.component.html',
  styleUrls: ['./servicios-asociados.component.css']
})
export class ServiciosAsociadosComponent implements OnInit , AfterViewInit {

  public usuario:UsuarioPortal=new UsuarioPortal();
  @ViewChild('iframe') iframe!: ElementRef;

  constructor(private toast:AppToastServiceService, private router:Router) { 
    this.usuario= JSON.parse(localStorage.getItem('data')+'');
  }


  ngAfterViewInit() {
   this.iframe.nativeElement.setAttribute('src', this.usuario.urlServicio);
  }
  ngOnInit(): void {
    if(this.usuario.urlServicio == ""){
      this.toast.error("Usted no posee el servicio de tablero de gestión contratado"); 
      this.router.navigateByUrl('/busqueda');

    }
  }

}
