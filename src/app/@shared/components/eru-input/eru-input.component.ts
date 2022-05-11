import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-eru-input',
  templateUrl: './eru-input.component.html',
  styleUrls: ['./eru-input.component.css'],
})
export class EruInputComponent {
  @Input() placeholder!: string;

  @Input() inputFormControl!: FormControl;

  @Output() restart: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() search: EventEmitter<void> = new EventEmitter<void>();

  @Output() clear: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
