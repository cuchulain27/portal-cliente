import { SpinnerService } from './../../../services/spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  isLoading = this.spinnerService.isLoading;
  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
