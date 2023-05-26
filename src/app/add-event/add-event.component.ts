import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  form!: FormGroup;
  selectedDate:string = `${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`;
  isPresent:boolean = true;
  constructor(private fb: FormBuilder, private _mainservice:MainService) {}
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(3)]),
      description: new FormControl('',[Validators.required,Validators.minLength(3)]),
    });
    this._mainservice.selectedDate.subscribe(res => this.selectedDate = res);
  }
  addEvent(){
    let events = [];
    let eventData = this.form.value
    events.push(this.form.value);
    let payload = {
      date:this.selectedDate,
      events:events
    }
    this._mainservice.addEventInDb(payload,eventData);
  }
}
