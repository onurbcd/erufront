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
import * as moment from 'moment';
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

  max = moment.utc();

  min = moment.utc({ year: AppConstants.MIN_YEAR, month: 0, day: 1 });

  files: FileList = {} as FileList;

  numberOfFiles = 0;

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
      { value: this.defaultValues.balanceType, disabled: this.id },
      [Validators.required]
    );

    this.formGroup = this.formBuilder.group({
      active: [activeDefaultValue, [Validators.required]],
      sequence: [
        { value: sequenceDefaultValue, disabled: true },
        [Validators.required],
      ],
      dayCalendarDate: [
        { value: this.defaultValues.dayCalendarDate, disabled: this.id },
        [Validators.required],
      ],
      sourceId: [
        { value: this.defaultValues.sourceId, disabled: this.id },
        [Validators.required],
      ],
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

    const balanceSave: BalanceSave = this.formGroup.getRawValue();

    this.balanceService
      .saveBalance(this.id, balanceSave, this.files)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.afterSave(commands));
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.files = target.files as FileList;
    this.numberOfFiles = this.files.length;
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
