import {
  Component,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  endOfDay
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { MatDialog } from '@angular/material/dialog';

interface customCalendarEventAction {
  label: string;
  onClick: ({ event, sourceEvent }: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent }) => void;
}

interface CalendarEventActionWithIndex extends customCalendarEventAction {
  onClick: ({ event, sourceEvent, rowIndex }: { event: CalendarEvent; sourceEvent: MouseEvent | KeyboardEvent; rowIndex?: number }) => void;
}


//TODO: consider using ChangeDetectionStrategy.OnPush
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  @ViewChild('previewDialog')previewDialog!: TemplateRef<any>;
  @ViewChild('editDialog')editDialog!: TemplateRef<any>;

  activeEvent: any;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  displayedColumns: string[] = ['description', 'status', 'startsAt', 'endsAt', 'actions'];

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  actions: CalendarEventActionWithIndex[] = [
    {
      label: 'Edit',
      onClick: ({ event }: { event: CalendarEvent; rowIndex?: number }): void => {
        this.activeEvent = event;
        this.createUpdateEvent();
      }
    },
    {
      label: 'Delete',
      onClick: ({ event, rowIndex }: { event: CalendarEvent; rowIndex?: number }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.activeEvent = event;
        this.deleteEvent(rowIndex);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      title: 'A 1 day event',
      color: this.colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: this.colors.yellow,
      actions: this.actions
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.blue,
      allDay: true
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: this.colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  activeDayIsOpen: boolean = true;

  constructor(public dialog: MatDialog) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next({});
  }

  createUpdateEvent(): void {
    this.dialog.open(this.editDialog);
  }

  previewEvent(event: any): void {
    this.activeEvent = event;
    this.dialog.open(this.previewDialog);
  }

  saveEventChanges(data:any): void {
    this.dialog.closeAll()

    if(this.activeEvent) {
      this.activeEvent.title = data.title;
      this.activeEvent.start = data.start;
      this.activeEvent.end = data.end;
      this.activeEvent.allDay = data.allDay;
      this.activeEvent = null;
    } else {
      this.events.push({
        title: data.title,
        start: data.start,
        end: data.end,
        color: this.colors.red, // TODO: add color to indicate status
        draggable: true, // By default set to true
        resizable: {
          beforeStart: true, // By default set to true
          afterEnd: true // By default set to true
        }
      });
    }

    this.refresh.next({})
  }

  deleteEvent(index: any) {
    if (index >= 0 && index < this.events.length) {
      this.events.splice(index, 1);
      this.refresh.next({});
    }
  }

  getStatusText(color: string) {
    if (color === this.colors.red.primary) {
      return 'active';
    } else if (color === this.colors.yellow.primary) {
      return 'in process';
    } else if (color === this.colors.blue.primary) {
      return 'delivered';
    } else {
      return 'unknown';
    }
  }
}
