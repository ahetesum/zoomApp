import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meeting',
  templateUrl: './add-meeting.component.html',
  styleUrls: ['./add-meeting.component.css']
})
export class AddMeetingComponent implements OnInit {

  isMeetingCreated=false;
  meetingId="";

  jwtToken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJpZWNfeDUxRFF1T2x3TzRoQkpzZGhnIiwiZXhwIjoxNTk1NDkwNjE0NjMzLCJpYXQiOjE1OTU0OTA2MDl9.G9sGeijSU-9D71SYGH1hXYZg5iU14N9_suBnv4aQ3C8";

  selectedDate="";
  selectedType=2;
  selectedTimezone= "Asia/Calcutta"
   foodTypes =[
    {value:1,viewValue:"Instant Meeting"},
    {value:2,viewValue:"Schedule Meeting"},
    {value:3,viewValue:"Recurring Meeting"},
  ];
  timezones =[
    {value:"Asia/Calcutta",viewValue:"India"},
    {value:"America/Los_Angeles",viewValue:"USA"},
    {value:"Europe/London",viewValue:"Britain"},
  ];

  constructor(public httpClient:HttpClient,public router:Router) { }

  ngOnInit(): void {
  }

  onDateChange(event)
  {
    console.log(event.value)
    this.selectedDate= event.value;
  }

  onAddMeeting(addMeetingForm:NgForm)
  {
    if(addMeetingForm.invalid)
    return;
    const meetingJson= {
      topic:addMeetingForm.value.topic,
      type:this.selectedType,
      start_time: addMeetingForm.value.start_time,
      duration:Number(addMeetingForm.value.duration),
      password:addMeetingForm.value.password,
    }

    console.log(meetingJson)

    this.httpClient.post<any>('http://localhost:3001/api/meetings',meetingJson).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/']);
    })
   // this.postService.addPost(postForm.value.title,postForm.value.description);
  }
}



