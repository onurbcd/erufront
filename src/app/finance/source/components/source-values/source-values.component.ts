import { Component, Input } from '@angular/core';
import { SourceSum, SourceFilter } from '@model';
import { SourceService } from '@service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-source-values',
  templateUrl: './source-values.component.html',
  styleUrls: ['./source-values.component.css'],
})
export class SourceValuesComponent {
  private sourceFilter = {} as SourceFilter;

  sourceSum$!: Observable<SourceSum>;

  @Input()
  set source(sourceFilter: SourceFilter) {
    this.sourceFilter = sourceFilter;
    this.getSourceSum();
  }

  constructor(private sourceService: SourceService) {}

  getSourceSum(): void {
    this.sourceSum$ = this.sourceService.getSourceSum(this.sourceFilter);
  }

  resetSourceSum(): void {
    this.sourceSum$ = of(new SourceSum(0, 0));
  }
}
