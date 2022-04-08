import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-buttons',
  templateUrl: './form-buttons.component.html',
  styleUrls: ['./form-buttons.component.css'],
})
export class FormButtonsComponent {
  @Input() disabled: boolean = true;

  @Input() link: string = '';

  @Output() save: EventEmitter<any[]> = new EventEmitter<any[]>();
}
