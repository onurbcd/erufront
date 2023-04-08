import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '@service';

@Component({
  selector: 'app-balance-creation',
  templateUrl: './balance-creation.component.html',
  styleUrls: ['./balance-creation.component.css'],
})
export class BalanceCreationComponent implements AfterViewInit {
  constructor(private appService: AppService) {}

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.balance.formTitle');
  }
}
