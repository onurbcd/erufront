import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-select',
  templateUrl: './basic-select.component.html',
  styleUrls: ['./basic-select.component.css'],
})
export class BasicSelectComponent {
  @Input() label: string = '';

  @Input() selectFormControl: FormControl = new FormControl();

  @Input() values: any[] = [];

  @Output() selectionChange: EventEmitter<void> = new EventEmitter<void>();

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
