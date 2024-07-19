import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-scedule',
  templateUrl: './preview-scedule.component.html',
  styleUrl: './preview-scedule.component.css'
})
export class PreviewSceduleComponent {
  @Input() event: any;
}
