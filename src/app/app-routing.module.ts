import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailsMeetingComponent} from './meetings/details-meeting/details-meeting.component'
import {AddMeetingComponent} from './meetings/add-meeting/add-meeting.component'
import {ListMeetingComponent} from './meetings/list-meeting/list-meeting.component'


const routes: Routes = [
  { path: '', redirectTo: 'meetings', pathMatch: 'full' },
  { path: 'meetings', component: ListMeetingComponent },
  { path: 'meetings/:id', component: DetailsMeetingComponent },
  { path: 'add', component: AddMeetingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
