import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SideNavService } from 'src/app/core/services/side-nav.service';

@Component({
  selector: 'app-schedule-dashboard',
  templateUrl: './schedule-dashboard.component.html',
  styleUrls: ['./schedule-dashboard.component.scss'],
})
export class ScheduleDashboardComponent implements OnInit {
  constructor(private sidenavService: SideNavService) {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    titleFormat:{month:'long',year:'numeric',day:'2-digit'},
    dayHeaderFormat:{ weekday: 'long' },//weekday: 'short',omitCommas:false,day:'numeric',dayPeriod:'short',dateStyle:'long
    customButtons: {
      addNewEventButton: {
        text: 'Add New Event',
        click: this.addEvent.bind(this)
      }
    },
    slotLabelFormat: [
      {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }
    ],
    
    
    dateClick: this.handleDateClick.bind(this),
    events: [
      { 
        title: 'BCH237',
        start: '2022-10-12T10:30:00',
        end: '2022-10-12T11:30:00',
        allDay:true,
        extendedProps: {
          department: 'BioChemistry'
        },
        description: 'Lecture'
      },
    ],
    headerToolbar: {
      left: 'prev,next today addNewEventButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
   
  };

  handleDateClick(arg: { dateStr: string }) {
    const params = {
      data: arg.dateStr,
      type: 'Calendar',
    };
    this.sidenavService.$dynamicForm.next(params);
  }

  ngOnInit(): void {
   
  }

  addEvent(){
    alert('Add@@@@')
  }
}
