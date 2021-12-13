import { LoginPortal } from './../models/LoginPortal';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import * as moment from 'moment';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private genericService: GenericService) {
    this.genericService = genericService;
  }

  public controller = 'UsuarioPortal/';

  async preLogin(login: LoginPortal) {
    let json;
    try {
      let salida = await this.genericService.Post(this.controller + 'preLogin/', login);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;

    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

  async login(login: LoginPortal) {
    let json;
    
    try {
      let salida = await this.genericService.Post(this.controller + 'login/', login);
      json = typeof salida === 'string' ? JSON.parse(salida) : null;
      localStorage.setItem('id_token', json.data.token);
    } catch (err:any) {
      json = JSON.parse(err).error;
    }
    return json;
  }

  logout() {
    localStorage.clear();
  }

}
