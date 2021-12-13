import { Injectable,EventEmitter, Output } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
@Output() disparador: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
