import { Component, Input } from '@angular/core';
import { BalanceSum, SourceFilter } from '@model';
import { SourceService } from '@service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-source-values',
  templateUrl: './source-values.component.html',
  styleUrls: ['./source-values.component.css'],
})
export class SourceValuesComponent {
  private sourceFilter = {} as SourceFilter;

  balanceSum$!: Observable<BalanceSum>;

  @Input()
  set source(sourceFilter: SourceFilter) {
    this.sourceFilter = sourceFilter;
    this.getBalanceSum();
  }

  constructor(private sourceService: SourceService) {}

  getBalanceSum(): void {
    this.balanceSum$ = this.sourceService.getBalanceSum(this.sourceFilter);
  }

  resetBalanceSum(): void {
    this.balanceSum$ = of(new BalanceSum(0, 0));
  }
}
