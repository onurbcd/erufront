import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { BalanceFilter, BalanceSum, BalanceSumType } from '@model';
import { BalanceService } from '@service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-balance-values',
  templateUrl: './balance-values.component.html',
  styleUrls: ['./balance-values.component.css'],
})
export class BalanceValuesComponent implements OnDestroy {
  private unsubscribe$ = new Subject<void>();

  private balanceFilter = {} as BalanceFilter;

  balanceSum: BalanceSum[] = [];

  BalanceSumType = BalanceSumType;

  @Input()
  set balance(balanceFilter: BalanceFilter) {
    this.balanceFilter = balanceFilter;
    this.getBalanceSum();
  }

  @Output() sumFetched: EventEmitter<BalanceSum[]> = new EventEmitter<
    BalanceSum[]
  >();

  constructor(private balanceService: BalanceService) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getBalanceSum(): void {
    this.balanceService
      .getSum(this.balanceFilter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((balanceSum) => {
        this.balanceSum = balanceSum;
        this.sumFetched.next(balanceSum);
      });
  }

  resetBalanceSum(): void {
    this.balanceSum = [
      new BalanceSum(BalanceSumType.INCOME, 0),
      new BalanceSum(BalanceSumType.OUTCOME, 0),
      new BalanceSum(BalanceSumType.DIFF, 0),
      new BalanceSum(BalanceSumType.SIZE, 0),
    ];
  }

  getValue(balanceSum: BalanceSum[], balanceSumType: BalanceSumType): number {
    return balanceSum.find((item) => item.type == balanceSumType)?.value || 0;
  }
}
