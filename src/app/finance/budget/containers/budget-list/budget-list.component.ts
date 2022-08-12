import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BudgetFilter, Sum, SumType } from '@model';
import { AppService, DateService } from '@service';
import { BudgetGridComponent, BudgetValuesComponent } from '../../components';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css'],
})
export class BudgetListComponent implements OnInit, AfterViewInit {
  budgetFilter = {} as BudgetFilter;

  budgetValuesFilter = {} as BudgetFilter;

  @ViewChild(BudgetGridComponent)
  gridComponent!: BudgetGridComponent;

  @ViewChild(BudgetValuesComponent)
  valuesComponent!: BudgetValuesComponent;

  constructor(
    private dateService: DateService,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.budgetFilter = {} as BudgetFilter;
    this.budgetFilter.refYear = this.dateService.getCurrentYear();
    this.budgetFilter.refMonth = this.dateService.getCurrentMonth();
    this.budgetValuesFilter = this.budgetFilter;
  }

  ngAfterViewInit(): void {
    this.appService.setTitle('finance.budget.listTitle');
    this.gridComponent.search();
  }

  valueChanges(budgetFilter: BudgetFilter): void {
    this.budgetFilter = budgetFilter;
  }

  dateChange(budgetFilter: BudgetFilter): void {
    this.budgetValuesFilter = budgetFilter;
  }

  statusChanged(): void {
    this.valuesComponent.getTotals();
  }

  sumFetched(sum: Sum[]): void {
    let max = sum?.find((p) => p.type === SumType.SIZE)?.value || -1;
    this.gridComponent.setMax(max);
  }
}
