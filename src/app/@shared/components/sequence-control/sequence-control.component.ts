import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Direction, Sequence } from '@model';

@Component({
  selector: 'app-sequence-control',
  templateUrl: './sequence-control.component.html',
  styleUrls: ['./sequence-control.component.css'],
})
export class SequenceControlComponent {
  @Input() sequence: number = -1;

  @Input() id: string = '';

  @Output() updateSequence: EventEmitter<Sequence> =
    new EventEmitter<Sequence>();

  up(): void {
    this.updateSequence.next({ id: this.id, direction: Direction.UP });
  }

  down(): void {
    this.updateSequence.next({ id: this.id, direction: Direction.DOWN });
  }
}
