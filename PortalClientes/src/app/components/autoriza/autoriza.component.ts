import { RespuestaService } from './../../services/respuesta.service';
import { LoginPortal } from 'src/app/models/LoginPortal';
import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-autoriza',
  templateUrl: './autoriza.component.html',
  styleUrls: ['./autoriza.component.css']
})
export class AutorizaComponent implements OnInit {
  @Input() loginPortal: any;
  @Input() respuesta: any;
  constructor(private loginService: LoginService, private resService: RespuestaService) { }

  ngOnInit(): void {
  }


  autorizarLogueo() {
    this.loginService.login(this.loginPortal).then(
      respuesta => {
        this.resService.disparador.emit(respuesta)
      }
    )


  }
}
