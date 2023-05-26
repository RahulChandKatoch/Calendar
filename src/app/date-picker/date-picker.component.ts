import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  date!: FormGroup;
  currdate = new Date();
  hours = '00';
  minutes = '00';
  hoursOuter: any[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  hoursInner: any[] = [
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ];
  minutesArr: any[] = [
    '05',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '00'
  ];
  short: boolean = true;
  deg: number = 0;
  selectedHour: number = 0;
  selectedMinute: number = 0;
  showMinute: boolean = false;
  showPopup:boolean = false;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.date = new FormGroup({
      input: new FormControl(),
    });
  }
  hourClicked(index: number, type: string, selectedhour: number) {
    this.deg = index * 30;
    if (type === 'long') {
      this.short = false;
    }
    if (type === 'short') {
      this.short = true;
    }
    this.hours = selectedhour.toString();
    this.showMinute = !this.showMinute;
  }
  minuteClicked(index: number, minutes: number) {
    this.deg = index * 30;
    this.selectedMinute = minutes;
    this.minutes = this.selectedMinute.toString();
    this.showMinute = !this.showMinute;
    setTimeout(() => {
      this.showPopup = false;
    },100);
  }
  inputChange(){
    console.log(this.date.controls['input']);
  }
}
