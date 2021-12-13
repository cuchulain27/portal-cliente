import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public router: Router) {

  }

  ngOnInit(): void {
    this.revisaRuta();
  }


  revisaRuta() {
    let paso=this.router.url.split('?')[0];
    switch (paso) {
      case '/login':
        return false;
      default:
        break;

    }
    return true;

  }
}
