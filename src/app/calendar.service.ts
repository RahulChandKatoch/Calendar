import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  selectedMonth = new BehaviorSubject<number>(new Date().getMonth());
  selected = new BehaviorSubject<boolean>(false);
  constructor() {}
}
