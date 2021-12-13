import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GenericService {
  myAppUrl = environment.ruta;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    options: { responseType: 'text' }
  };
  
  constructor(private http: HttpClient) { }


  public Post(controlador: string, objeto: object) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(this.myAppUrl + controlador,
        JSON.stringify(objeto),
        this.httpOptions)
        .pipe()
        .subscribe(response => (resolve(JSON.stringify(response))), error => (reject(JSON.stringify(error))));
    });
  }

  public Get(controlador: string, objeto: object | string | number) { 
    let url = this.myAppUrl + controlador;
    switch (typeof objeto) {
      case 'object':
        url+=JSON.stringify(objeto);
        break;
      default:
        url+=objeto;
        break;
    }

    return new Promise((resolve, reject) => {
      this.http.get<any>(url,
        this.httpOptions)
        .pipe()
        .subscribe(response => (resolve(JSON.stringify(response))), error => (reject(JSON.stringify(error))));
    });
  }

  
  public GetAll(controlador: string) {
    let url = this.myAppUrl + controlador;
    return new Promise((resolve, reject) => {
      this.http.get<any>(url,
        this.httpOptions)
        .pipe()
        .subscribe(response => (resolve(JSON.stringify(response))), error => (reject(JSON.stringify(error))));
    });
  }
}
