import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BalanceFilter, BalanceType } from '@model';
import { AppService, DateService } from '@service';
import { BalanceGridComponent } from '../../components';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.css'],
})
export class BalanceListComponent implements OnInit, AfterViewInit {
  balanceFilter = {} as BalanceFilter;

  @ViewChild(BalanceGridComponent)
  gridComponent!: BalanceGridComponent;

  constructor(
    private dateService: DateService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.balanceFilter = {} as BalanceFilter;
    this.balanceFilter.dayCalendarYear = this.dateService.getCurrentYear();
    this.balanceFilter.dayCalendarMonth = this.dateService.getCurrentMonth();
    this.balanceFilter.balanceType = BalanceType.OUTCOME;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.balance.listTitle');
    this.gridComponent.search();
  }

  valueChanges(balanceFilter: BalanceFilter): void {
    this.balanceFilter = balanceFilter;
  }
}
