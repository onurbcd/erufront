import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-source-creation',
  templateUrl: './source-creation.component.html',
  styleUrls: ['./source-creation.component.css'],
})
export class SourceCreationComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.source.formTitle');
  }
}
