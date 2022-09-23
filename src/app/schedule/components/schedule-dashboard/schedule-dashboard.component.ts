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
    dateClick: this.handleDateClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
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

  ngOnInit(): void {}
}
