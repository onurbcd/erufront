import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-day-creation',
  templateUrl: './day-creation.component.html',
  styleUrls: ['./day-creation.component.css'],
})
export class DayCreationComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.day.formTitle');
  }
}
