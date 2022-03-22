import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eru-buttons',
  templateUrl: './eru-buttons.component.html',
  styleUrls: ['./eru-buttons.component.css'],
})
export class EruButtonsComponent {
  @Input() searchDisabled!: boolean;

  @Input() link!: string;

  @Output() search: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
