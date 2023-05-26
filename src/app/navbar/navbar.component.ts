import { Component } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showSideNav:boolean = false;
  constructor(private _mainservice:MainService){}
  ngOnInit(){
    this._mainservice.openEventMenu.subscribe(res => this.showSideNav = res);
  }
}
