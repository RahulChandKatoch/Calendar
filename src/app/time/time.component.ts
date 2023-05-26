import { Component } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.css'],
})
export class TimeComponent {
  today = '2023-05-02T08:02:17.000Z';
  calculateDiff(date:string):string {
    let start = new Date().getTime();
    let end = new Date(date).getTime();
    let time = (start - end)/1000;
    let diffYear = Math.floor(time/31536000);
    let diffDay = Math.floor(time/86400);
    let diffHour = Math.floor(time/3600);
    let diffMinute = Math.floor(time/60);

    if(diffYear >=1){
      return `${diffYear} years ago`;
    }
    else if(diffDay >= 1){
      if(diffDay >= 30){
        return `${Math.floor(diffDay / 30)} months ago`;
      }
      else if(diffDay >= 7){
        return `${Math.floor(diffDay / 7)} weeks ago`;
      }
      else{
        return `${diffDay} days ago`;
      }
    }
    else if(diffHour >= 1){
      return `${diffHour} hours ago`;
    }
    else if(diffMinute >= 1){
      return `${diffMinute} minutes ago`;
    }
    else{
      return `Just Now`;
    }
  }
}
