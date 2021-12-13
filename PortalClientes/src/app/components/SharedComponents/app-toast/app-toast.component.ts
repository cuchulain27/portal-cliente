import { AppToastServiceService } from '../../../services/app-toast-service.service';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './app-toast.component.html',
  styleUrls: ['./app-toast.component.css']
})
export class AppToastComponent implements OnInit {

  public body :any;
  public title:any;
  constructor(public toastService: AppToastServiceService) {
    this.body='';
    this.title='';
   }
   isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
  ngOnInit(): void {
  }

}
