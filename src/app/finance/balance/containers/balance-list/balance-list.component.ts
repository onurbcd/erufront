import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BalanceFilter } from '@model';
import { AppService } from '@service';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.css'],
})
export class BalanceListComponent implements OnInit, AfterViewInit {
  balanceFilter = {} as BalanceFilter;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.balanceFilter = {} as BalanceFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.balance.listTitle');
  }

  valueChanges(balanceFilter: BalanceFilter): void {
    this.balanceFilter = balanceFilter;
  }
}
