import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
  {
    path:'',
    component:CalendarComponent,
    pathMatch:'full'
  },
  {
    path:'add-events',
    component:AddEventComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
