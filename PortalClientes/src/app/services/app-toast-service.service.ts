import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastServiceService {
  toasts: any[] = [];

  constructor() { }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }
  success(mensaje: string) {
    this.show(mensaje, { classname: 'bg-success text-light', delay: 10000 });
  }
  error(mensaje: string) {
    this.show(mensaje, { classname: 'bg-danger text-light', delay: 10000 });
  }
  warning(mensaje: string) {
    this.show(mensaje, { classname: 'bg-warning text-dark', delay: 10000 });
  }
  info(mensaje: string) {
    this.show(mensaje, { classname: 'bg-primary text-light', delay: 10000 });
  }
}
