import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BudgetFilter, CopyBudget, Ref, Sum, SumType } from '@model';
import { AppService, BudgetService, DateService, ToastService } from '@service';
import { Subject, takeUntil } from 'rxjs';
import { BudgetGridComponent, BudgetValuesComponent } from '../../components';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.css'],
})
export class BudgetListComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  budgetFilter = {} as BudgetFilter;

  budgetValuesFilter = {} as BudgetFilter;

  @ViewChild(BudgetGridComponent)
  gridComponent!: BudgetGridComponent;

  @ViewChild(BudgetValuesComponent)
  valuesComponent!: BudgetValuesComponent;

  constructor(
    private dateService: DateService,
    private appService: AppService,
    private budgetService: BudgetService,
    private toastService: ToastService
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  copyBudget(copyBudget: CopyBudget): void {
    this.budgetService
      .copy(copyBudget)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.toastService.showSuccess('finance.budget.budgetCopy.success');
      });
  }

  deleteAll(ref: Ref): void {
    this.budgetService
      .deleteAll(ref)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.gridComponent.search();
        this.valuesComponent.getTotals();
        this.toastService.showSuccess('global.successDeleteAll');
      });
  }
}
