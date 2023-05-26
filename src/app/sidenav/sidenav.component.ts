import { Component } from '@angular/core';
import { MainService } from '../main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  selectedDate: string = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`;
  eventList: any[] = [];
  eventArr: any[] = [];
  constructor(private _mainservice: MainService, private router: Router) {}
  closeEventMenu() {
    this._mainservice.openEventMenu.next(false);
  }
  navigateToAddEventPage() {
    this.router.navigate(['add-events']);
  }
  ngOnInit() {
    this._mainservice.selectedDate.subscribe((res) => {
      this.selectedDate = res;
      this.getEventList();
    });
  }
  getEventList(){
    let data = localStorage.getItem('eventArr');
    if (data) {
      this.eventArr = JSON.parse(data);
    }
    let local = localStorage.getItem('eventArr');
    this.eventArr = local && JSON.parse(local);

    this.eventList = this.eventArr?.filter(
      (el: any) => el?.date === this.selectedDate
    );
  }
}
