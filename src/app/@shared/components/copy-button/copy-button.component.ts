import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.css'],
})
export class CopyButtonComponent {
  isCopied: boolean = false;

  @Input() content: string = '';

  @Input() icon: any = 'content_copy';

  constructor() {}

  success(): void {
    this.isCopied = true;
    interval(3000).subscribe(() => (this.isCopied = false));
  }
}
