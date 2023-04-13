import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import {
  BalanceFilter,
  BalanceType,
  Category,
  CategoryFilter,
  Page,
  Source,
  SourceFilter,
} from '@model';
import { CategoryService, DateService, SourceService } from '@service';
import { BaseFilterDirective, Debounce } from '@shared';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-balance-filter',
  templateUrl: './balance-filter.component.html',
  styleUrls: ['./balance-filter.component.css'],
})
export class BalanceFilterComponent
  extends BaseFilterDirective<BalanceFilter>
  implements OnInit
{
  sources$!: Observable<Page<Source>>;

  categories$!: Observable<Page<Category>>;

  years: number[] = [];

  months: number[] = [];

  days: number[] = [];

  balanceTypes: BalanceType[] = Object.values(BalanceType);

  dayCalendarYearFormControl = new FormControl(
    this.dateService.getCurrentYear(),
    [Validators.required]
  );

  dayCalendarMonthFormControl = new FormControl(
    this.dateService.getCurrentMonth(),
    [Validators.required]
  );

  dayCalendarDayInMonthFormControl = new FormControl('');

  balanceTypeFormControl = new FormControl(BalanceType.OUTCOME, [
    Validators.required,
  ]);

  @Output() filterChange: EventEmitter<BalanceFilter> =
    new EventEmitter<BalanceFilter>();

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private sourceService: SourceService,
    private categoryService: CategoryService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.years = this.dateService.getYears();
    this.months = this.dateService.getMonths();
    this.days = this.dateService.getDays();
    this.getSources('');
    this.getCategories('');
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      search: this.searchFormControl,
      active: this.activeFormControl,
      dayCalendarYear: this.dayCalendarYearFormControl,
      dayCalendarMonth: this.dayCalendarMonthFormControl,
      dayCalendarDayInMonth: this.dayCalendarDayInMonthFormControl,
      sourceId: [''],
      categoryId: [''],
      balanceType: this.balanceTypeFormControl,
    });
  }

  dateSelectionChange(): void {
    var year =
      this.dayCalendarYearFormControl.value ||
      this.dateService.getCurrentYear();

    var month =
      this.dayCalendarMonthFormControl.value ||
      this.dateService.getCurrentMonth();

    this.filterClear('dayCalendarDayInMonth');
    this.days = this.dateService.getDaysFromMonth(year, month);
    this.filterValueChange();
  }

  @Debounce(1000)
  searchSources(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getSources(searchInput);
  }

  filterSearchWithEvent(event: MatOptionSelectionChange<string>): void {
    if (!event.isUserInput) {
      return;
    }

    this.filterValueChange();
  }

  @Debounce(1000)
  searchCategories(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getCategories(searchInput);
  }

  filterValueChange(): void {
    this.filterSearch();

    setTimeout(() => {
      this.filterChange.next(this.formGroup.value);
    }, 0);
  }

  private getSources(search: string): void {
    this.sources$ = this.sourceService.getAll(
      { search } as SourceFilter,
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

  private getCategories(search: string): void {
    this.categories$ = this.categoryService.getAll(
      { search } as CategoryFilter,
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
