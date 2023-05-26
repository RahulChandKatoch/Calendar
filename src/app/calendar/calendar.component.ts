import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar.service';
import { MainService } from '../main.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  WeekArr: any[] = [];
  dateArr: any[] = [];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  years: number[] = [];
  selectedMonth: number = new Date().getMonth(); //current month index
  currYear = new Date().getFullYear();
  selectedMonthName: string = new Date().toLocaleString('default', {
    month: 'long',
  });
  selectedYear: number = this.currYear;
  number_of_weeks: number = 4;
  disabledDate: boolean = false;
  indexof1: number = 0;
  indexOfLastMonth: number = 0;
  selected: any;
  selectedDate: string = `${new Date().getDate()}`;
  constructor(
    private _calendarService: CalendarService,
    private _mainservice: MainService
  ) {}
  ngOnInit() {
    for (let i = this.currYear; i > 1899; i--) {
      this.years.unshift(i);
    }
    this._calendarService.selectedMonth.subscribe((data) => {
      this.selectedMonth = data;
    });
    this.getDay();
    if (this.selectedYear === this.currYear && this.selectedMonth === new Date().getMonth()) {
      this.selected = this.dateArr.indexOf(`${new Date().getDate()}`);
    }
  }
  getDay() {
    this.dateArr = [];
    let lastDayOfMonth = new Date(
      this.selectedYear,
      this.selectedMonth + 1,
      0
    ).getDate();
    let lastDayOfPrevMonth = new Date(
      this.selectedYear,
      this.selectedMonth,
      0
    ).getDate();
    for (let i = 1; i <= lastDayOfMonth; i++) {
      let day_of_week = new Date(
        `${this.selectedYear}-${this.selectedMonth + 1}-${i}`
      ).toLocaleDateString('en-US', { weekday: 'long' });
      if (i === 1 && day_of_week === 'Monday') {
        this.dateArr.push(`${lastDayOfPrevMonth}`);
      } else if (i === 1 && day_of_week === 'Tuesday') {
        this.dateArr.push(`${lastDayOfPrevMonth - 1}`, `${lastDayOfPrevMonth}`);
      } else if (i === 1 && day_of_week === 'Wednesday') {
        this.dateArr.push(
          `${lastDayOfPrevMonth - 2}`,
          `${lastDayOfPrevMonth - 1}`,
          `${lastDayOfPrevMonth}`
        );
      } else if (i === 1 && day_of_week === 'Thursday') {
        this.dateArr.push(
          `${lastDayOfPrevMonth - 3}`,
          `${lastDayOfPrevMonth - 2}`,
          `${lastDayOfPrevMonth - 1}`,
          `${lastDayOfPrevMonth}`
        );
      } else if (i === 1 && day_of_week === 'Friday') {
        this.dateArr.push(
          `${lastDayOfPrevMonth - 4}`,
          `${lastDayOfPrevMonth - 3}`,
          `${lastDayOfPrevMonth - 2}`,
          `${lastDayOfPrevMonth - 1}`,
          `${lastDayOfPrevMonth}`
        );
      } else if (i === 1 && day_of_week === 'Saturday') {
        this.dateArr.push(
          `${lastDayOfPrevMonth - 5}`,
          `${lastDayOfPrevMonth - 4}`,
          `${lastDayOfPrevMonth - 3}`,
          `${lastDayOfPrevMonth - 2}`,
          `${lastDayOfPrevMonth - 1}`,
          `${lastDayOfPrevMonth}`
        );
      }

      this.dateArr.push(i.toString());

      if (i === lastDayOfMonth && day_of_week === 'Friday') {
        this.dateArr.push('1');
      } else if (i === lastDayOfMonth && day_of_week === 'Thursday') {
        this.dateArr.push('1', '2');
      } else if (i === lastDayOfMonth && day_of_week === 'Wednesday') {
        this.dateArr.push('1', '2', '3');
      } else if (i === lastDayOfMonth && day_of_week === 'Tuesday') {
        this.dateArr.push('1', '2', '3', '4');
      } else if (i === lastDayOfMonth && day_of_week === 'Monday') {
        this.dateArr.push('1', '2', '3', '4', '5');
      } else if (i === lastDayOfMonth && day_of_week === 'Sunday') {
        this.dateArr.push('1', '2', '3', '4', '5', '6');
      }
    }
    this.indexof1 = this.dateArr.indexOf('1');
    this.indexOfLastMonth = this.dateArr.lastIndexOf(lastDayOfMonth.toString());
  }
  changeMonth(direction: string) {
    if (direction === '-1') {
      this._calendarService.selectedMonth.next(
        this.selectedMonth > 0 ? this.selectedMonth - 1 : this.selectedMonth
      );
    } else if (direction === '+1') {
      this._calendarService.selectedMonth.next(
        this.selectedMonth < 11 ? this.selectedMonth + 1 : this.selectedMonth
      );
    }
    this._calendarService.selectedMonth.subscribe((data) => {
      if (data >= 0 && data <= 11) {
        this.selectedMonthName = this.months[data];
      }
    });
    this.dateArr = [];
    this.getDay();
  }
  selectYear(event: any) {
    this.selectedYear = event.target.value;
    this.dateArr = [];
    this.getDay();
  }
  openEventMenu(i: number, date: number) {
    if (i >= this.indexof1 && i <= this.indexOfLastMonth) {
      this._mainservice.openEventMenu.next(true);
      this.selected = i;
      this.selectedDate = date.toString();
      let completeDate = `${date}-${this.selectedMonth + 1}-${
        this.selectedYear
      }`;
      this._mainservice.selectedDate.next(completeDate);
    }
  }
}
