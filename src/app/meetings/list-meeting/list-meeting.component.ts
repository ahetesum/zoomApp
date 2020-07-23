import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import {Meeting} from './../meeting.model'

@Component({
  selector: 'app-list-meeting',
  templateUrl: './list-meeting.component.html',
  styleUrls: ['./list-meeting.component.css']
})

export class ListMeetingComponent implements OnInit {


  meetings:Meeting[]=[];

  constructor(public httpClient:HttpClient) { }

  ngOnInit(): void {
    this.getAllMeetings()
  }



  getAllMeetings()
  {
    this.httpClient.get<any>('http://localhost:3001/api/meetings')
    .pipe(map((response)=>{
      return response.meetings.meetings.map(meeting=>{
        return {
          topic: meeting.topic,
          join_url:meeting.join_url,
          start_time:meeting.start_time,
          id:meeting.id,
        }
      })
  }))
    .subscribe((transformedMeetings)=>{
      console.log(transformedMeetings)
      this.meetings =transformedMeetings;
    })
  }


  onDeleteMeeting(meetingId)
  {
    this.httpClient.delete('http://localhost:3001/api/meetings/'+meetingId).subscribe((res)=>{
      console.log(res)
      this.getAllMeetings();
    })

  }


}
