import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {
  CurrencyType,
  IncomeSource,
  IncomeSourceFilter,
  Page,
  SourceFilter,
  SourceType,
} from '@model';
import { IncomeSourceService } from '@service';
import { BaseFilterDirective, Debounce } from '@shared';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-source-filter',
  templateUrl: './source-filter.component.html',
  styleUrls: ['./source-filter.component.css'],
})
export class SourceFilterComponent
  extends BaseFilterDirective<SourceFilter>
  implements OnInit
{
  incomeSources$!: Observable<Page<IncomeSource>>;

  sourceTypes: SourceType[] = Object.values(SourceType);

  currencyTypes: CurrencyType[] = Object.values(CurrencyType);

  sourceTypeFormControl = new FormControl('');

  currencyTypeFormControl = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private incomeSourceService: IncomeSourceService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getIncomeSources('');
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      search: this.searchFormControl,
      active: this.activeFormControl,
      incomeSourceId: [''],
      sourceType: this.sourceTypeFormControl,
      currencyType: this.currencyTypeFormControl,
    });
  }

  @Debounce(1000)
  searchIncomeSource(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getIncomeSources(searchInput);
  }

  private getIncomeSources(search: string): void {
    this.incomeSources$ = this.incomeSourceService.getAll(
      { search } as IncomeSourceFilter,
      {
        pageIndex: 0,
        pageSize: AppConstants.PAGE_SIZE_SELECT,
        length: 0,
      },
      {
        active: 'name',
        direction: 'asc',
      }
    );
  }
}
