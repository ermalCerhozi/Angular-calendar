import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { start } from '@popperjs/core';
import { PickerInteractionMode } from 'igniteui-angular';

@Component({
  selector: 'app-edit-scedule',
  templateUrl: './edit-scedule.component.html',
  styleUrl: './edit-scedule.component.css'
})
export class EditScheduleComponent implements OnChanges {
    @Input() event?: any;
    @Output() save = new EventEmitter<any>();

    public mode: PickerInteractionMode = PickerInteractionMode.DropDown;
    public format = 'hh:mm';

    eventForm = new FormGroup({
        title: new FormControl(''),
        start: new FormControl(new Date().toISOString().substring(0, 19)),
        end: new FormControl(new Date().toISOString().substring(0, 19)),
        allDay: new FormControl(false),
    });

    ngOnChanges(changes: SimpleChanges) {
        if (changes['event'] && changes['event'].currentValue) {
            this.eventForm.patchValue({
                title: this.event?.title,
                start: this.event?.start,
                end: this.event?.end,
                allDay: this.event?.allDay,
            });
        }
    }

    editEvent() {     
        this.save.emit(this.eventForm.value);
    }
}