import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('home.title');
  }
}
