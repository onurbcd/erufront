import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BalanceFilter, BalanceSum, BalanceSumType, BalanceType } from '@model';
import { AppService, DateService } from '@service';
import { BalanceGridComponent, BalanceValuesComponent } from '../../components';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.css'],
})
export class BalanceListComponent implements OnInit, AfterViewInit {
  balanceFilter = {} as BalanceFilter;

  balanceValuesFilter = {} as BalanceFilter;

  @ViewChild(BalanceGridComponent)
  gridComponent!: BalanceGridComponent;

  @ViewChild(BalanceValuesComponent)
  valuesComponent!: BalanceValuesComponent;

  constructor(
    private dateService: DateService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.balanceFilter = {} as BalanceFilter;
    this.balanceFilter.dayCalendarYear = this.dateService.getCurrentYear();
    this.balanceFilter.dayCalendarMonth = this.dateService.getCurrentMonth();
    this.balanceFilter.balanceType = BalanceType.OUTCOME;

    this.balanceValuesFilter = {} as BalanceFilter;
    this.balanceValuesFilter.dayCalendarYear =
      this.dateService.getCurrentYear();
    this.balanceValuesFilter.dayCalendarMonth =
      this.dateService.getCurrentMonth();
    this.balanceValuesFilter.balanceType = BalanceType.OUTCOME;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.balance.listTitle');
    this.gridComponent.search();
  }

  valueChanges(balanceFilter: BalanceFilter): void {
    this.balanceFilter = balanceFilter;
  }

  filterChange(balanceFilter: BalanceFilter): void {
    this.balanceValuesFilter = balanceFilter;
  }

  listChanged(): void {
    this.valuesComponent.getBalanceSum();
  }

  restart(cleanData: boolean): void {
    this.gridComponent.reset(cleanData);
    this.valuesComponent.resetBalanceSum();
  }

  sumFetched(balanceSum: BalanceSum[]): void {
    let max =
      balanceSum?.find((p) => p.type === BalanceSumType.SIZE)?.value || -1;

    this.gridComponent.setMax(max);
  }
}
