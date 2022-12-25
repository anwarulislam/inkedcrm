import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SideNavService } from 'src/app/core/services/side-nav.service';
import { SnackToastrService } from 'src/app/core/services/snackToastr.service';
import { GenericApiCallingService } from 'src/app/core/services/api.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { CreateScheduleComponent } from './components/create-schedule/create-schedule.component';
import listPlugin from '@fullcalendar/list';
import { CalendarOptions } from 'fullcalendar';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  events: any[] = [];
  realEvents: any[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    initialView: 'dayGridMonth',
    titleFormat: { month: 'long', year: 'numeric', day: '2-digit' },
    dayHeaderFormat: { weekday: 'long' }, //weekday: 'short',omitCommas:false,day:'numeric',dayPeriod:'short',dateStyle:'long
    customButtons: {
      addNewEventButton: {
        text: 'Add New Event',
        click: this.addEvent.bind(this),
      },
    },
    slotLabelFormat: [
      {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      },
    ],

    dateClick: this.handleDateClick.bind(this),
    // eventClick: this.handleDateClick.bind(this),
    events: [],
    headerToolbar: {
      left: 'prev,next today addNewEventButton',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
  };

  constructor(
    private sidenavService: SideNavService,
    private _toastr: SnackToastrService,
    private _dialog: MatDialog,
    private _authService: AuthService,
    private _apiService: GenericApiCallingService
  ) {}

  handleDateClick(arg: any) {
    let date = arg.dateStr.split('-');
    let todayEvents: any = [];
    this.events.forEach((event: any) => {
      if (event.start.split('T')[0] == `${arg.dateStr}`) {
        todayEvents.push(event);
      }
    });

    const params = {
      data: todayEvents,
      type: 'Calendar',
    };
    this.sidenavService.$dynamicForm.next(params);
  }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this._apiService.GetData('event', 'allEvents', '').subscribe(
      (res: any) => {
        this.realEvents = res.result;
        console.log(this.realEvents);
        res.result.forEach((event: any) => {
          let startDate = event.startDateStr.split('/');
          let endDate = event.endDateStr.split('/');
          this.events.push({
            title: `${event.comments}`,
            start: `${startDate[2]}-${startDate[1]}-${startDate[0]}T${event.startTime}`,
            end: `${endDate[2]}-${endDate[1]}-${endDate[0]}T${event.endTime}`,
            // allDay:true,
            extendedProps: {
              cost: event.cost,
              tattooLocation: event.tattooLocation,
              cancelled: event.cancelled,
              noShow: event.noShow,
              reschedule: event.reschedule,
              eventID: event.eventID,
              artistID: event.artistID,
              userDTO: event.userDTO,
              customerID: event.customerID,
              customerDTO: event.customerDTO,
            },
          });

          console.log(this.events);
        });

        // this.calendarOptions.events = [...this.events];
      },
      (err) => {
        if (err.status == 403) {
          this._toastr.warning('Please login again');
          this._authService.logout();
        } else {
          this._toastr.error('Connection Problem');
        }
      }
    );
  }

  addEvent() {
    const dialogRef = this._dialog.open(CreateScheduleComponent, {
      width: '650px',
      height: '700px',
      panelClass: '',
      data: { edit: false, data: null },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      if (result) {
        this.getEvents();
      }
    });
  }
}
