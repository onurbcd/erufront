import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { BudgetFilter, Sum, SumType } from '@model';
import { BudgetService } from '@service';
import { Subject, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-budget-values',
  templateUrl: './budget-values.component.html',
  styleUrls: ['./budget-values.component.css'],
})
export class BudgetValuesComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  total = 0;

  paid = 0;

  unpaid = 0;

  description = '';

  private budgetFilter = {} as BudgetFilter;

  @Input()
  set budget(budgetFilter: BudgetFilter) {
    this.budgetFilter = budgetFilter;
    this.setDescription();
    this.getTotals();
  }

  @Output() sumFetched: EventEmitter<Sum[]> = new EventEmitter<Sum[]>();

  constructor(private budgetService: BudgetService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTotals(): void {
    this.budgetService
      .getSumByMonth(this.budgetFilter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((sum) => {
        this.setTotals(sum);
        this.sumFetched.next(sum);
      });
  }

  setTotals(sum: Sum[]): void {
    this.total = 0;
    this.paid = 0;
    this.unpaid = 0;

    if (!sum || sum.length <= 0) {
      return;
    }

    this.total = sum.find((p) => p.type === SumType.TOTAL)?.value || 0;
    this.paid = sum.find((p) => p.type === SumType.PAID)?.value || 0;
    this.unpaid = sum.find((p) => p.type === SumType.UNPAID)?.value || 0;
  }

  setDescription(): void {
    this.description = '';

    const date = new Date(
      this.budgetFilter.refYear,
      this.budgetFilter.refMonth - 1,
      1
    );

    this.description = `${date.toLocaleString(AppConstants.DEFAULT_LANG, {
      month: 'long',
    })} ${this.budgetFilter.refYear}`;
  }
}
