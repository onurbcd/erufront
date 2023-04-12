import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Balance,
  BalanceFilter,
  BalanceSave,
  BalanceType,
  Category,
  CategoryFilter,
  Page,
  Source,
  SourceFilter,
} from '@model';
import {
  BalanceService,
  CategoryService,
  SourceService,
  ToastService,
} from '@service';
import { BaseFormDirective, Debounce } from '@shared';
import { Observable, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-balance-form',
  templateUrl: './balance-form.component.html',
  styleUrls: ['./balance-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: AppConstants.APP_DATE_FORMAT },
  ],
})
export class BalanceFormComponent
  extends BaseFormDirective<Balance, BalanceSave, BalanceFilter, string>
  implements OnInit
{
  readonly currencyMaskConfig = AppConstants.CURRENCY_MASK_CONFIG;

  sources$!: Observable<Page<Source>>;

  categories$!: Observable<Page<Category>>;

  balanceTypes: BalanceType[] = Object.values(BalanceType);

  balanceTypeFormControl = new FormControl();

  constructor(
    activatedRoute: ActivatedRoute,
    toastService: ToastService,
    router: Router,
    private balanceService: BalanceService,
    private formBuilder: FormBuilder,
    private sourceService: SourceService,
    private categoryService: CategoryService
  ) {
    super(activatedRoute, balanceService, toastService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected override buildForm(): void {
    const activeDefaultValue =
      this.defaultValues.active == null ? true : this.defaultValues.active;

    const sequenceDefaultValue =
      this.defaultValues.sequence == null ? 1 : this.defaultValues.sequence;

    this.balanceTypeFormControl = new FormControl(
      this.defaultValues.balanceType,
      [Validators.required]
    );

    this.formGroup = this.formBuilder.group({
      active: [activeDefaultValue, [Validators.required]],
      sequence: [sequenceDefaultValue, [Validators.required]],
      dayCalendarDate: [
        this.defaultValues.dayCalendarDate,
        [Validators.required],
      ],
      sourceId: [this.defaultValues.sourceId, [Validators.required]],
      categoryId: [this.defaultValues.categoryId, [Validators.required]],
      amount: [this.defaultValues.amount, [Validators.required]],
      code: [
        this.defaultValues.code,
        [Validators.required, Validators.maxLength(AppConstants.LENGTH_150)],
      ],
      description: [
        this.defaultValues.description,
        [Validators.maxLength(AppConstants.LENGTH_250)],
      ],
      balanceType: this.balanceTypeFormControl,
    });
  }

  protected override afterInit(): void {
    this.getSources(this.defaultValues.sourceName);
    this.getCategories(this.defaultValues.categoryName);
  }

  @Debounce(1000)
  searchSources(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getSources(searchInput);
  }

  @Debounce(1000)
  searchCategories(searchInput: string): void {
    if (!searchInput || searchInput.trim().length < 3) {
      return;
    }

    this.getCategories(searchInput);
  }

  saveBalance(commands: any[]): void {
    if (this.formGroup.invalid) {
      return;
    }

    const balanceSave: BalanceSave = this.formGroup.value;

    this.balanceService
      .saveBalance(this.id, balanceSave)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.afterSave(commands));
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
