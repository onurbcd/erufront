import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-status',
  templateUrl: './filter-status.component.html',
  styleUrls: ['./filter-status.component.css'],
})
export class FilterStatusComponent {
  @Input() statusFormControl: FormControl = new FormControl('');

  @Input() translation: string = '';

  @Output() search: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
