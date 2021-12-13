import * as JSZipUtils  from 'jszip-utils';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
//import * as JSZipUtils from './JsZipUtils';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class ZipService {
  ruta: string = 'informes/';

  constructor(private http: HttpClient) {
   }

  descargarTodo(data: any[]) {
    let nuevo: string[] = [];
    data.forEach((informe: string) => {
      if (parseInt(informe) > 0) {
        nuevo.push(this.ruta + 'f' + informe.toString() + '.pdf');
      }
    });

    this.create_zip(nuevo);
  }




  // let zip: JSZip = new JSZip();
  // var img = zip.folder("Informes")!;

  // data.forEach((informe: string) => {
  //   img.file(this.ruta + informe.toString() + '.pdf', null, { base64: true, dir: true })
  // });



  // zip.generateAsync({ type: "blob" })
  //   .then(function (content) {
  //     saveAs(content, "Informes.zip");
  //   });



  create_zip(urls: string[]) {

    var zip = new JSZip();
    var count = 0;
    var zipFilename = "informes.zip";
    urls.forEach(function (url) {
      var filename = url.substr(url.lastIndexOf('/') + 1);
      // loading a file and add it in a zip file

      JSZipUtils.getBinaryContent(url, function (err: any, data: any) {
        if (err) {
          throw err; // or handle the error
        }
        zip.file(filename, data, { binary: true });
        count++;
        if (count == urls.length) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            saveAs(content, zipFilename);
          });
        }
      });
    });
  };


}
