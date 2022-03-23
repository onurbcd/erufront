import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-eru-actions',
  templateUrl: './eru-actions.component.html',
  styleUrls: ['./eru-actions.component.css'],
})
export class EruActionsComponent {
  @Input() id!: string;

  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  @Output() delete: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}
}
