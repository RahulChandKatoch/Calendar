import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  openEventMenu = new BehaviorSubject(false);
  eventArr: any[] = [];
  selectedDate = new BehaviorSubject(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  isPresent: boolean = true;
  constructor() {}
  addEventInDb(data: any, eventData: any) {
    let local = localStorage.getItem('eventArr');
    let eventArr$ = local && JSON.parse(local);
    let currDateIndex = eventArr$?.length?eventArr$?.findIndex((obj:any) => obj?.date === data?.date ):-1;
    if (currDateIndex !== -1 && eventArr$.length > 0) {
      eventArr$[currDateIndex]?.events?.push(eventData);
      this.eventArr = eventArr$;
    } else {
      this.eventArr?.push(data);
    }
    localStorage.setItem('eventArr', JSON.stringify(this.eventArr));
  }
}
