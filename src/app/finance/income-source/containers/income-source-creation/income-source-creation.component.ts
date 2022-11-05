import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-income-source-creation',
  templateUrl: './income-source-creation.component.html',
  styleUrls: ['./income-source-creation.component.css'],
})
export class IncomeSourceCreationComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.incomeSource.formTitle');
  }
}
