import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CurrencyType,
  IncomeSource,
  IncomeSourceFilter,
  Page,
  Source,
  SourceFilter,
  SourceSave,
  SourceType,
} from '@model';
import { IncomeSourceService, SourceService, ToastService } from '@service';
import { BaseFormDirective, Debounce } from '@shared';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-source-form',
  templateUrl: './source-form.component.html',
  styleUrls: ['./source-form.component.css'],
})
export class SourceFormComponent
  extends BaseFormDirective<Source, SourceSave, SourceFilter, string>
  implements OnInit
{
  incomeSources$!: Observable<Page<IncomeSource>>;

  sourceTypes: SourceType[] = Object.values(SourceType);

  currencyTypes: CurrencyType[] = Object.values(CurrencyType);

  sourceTypeFormControl = new FormControl();

  currencyTypeFormControl = new FormControl();

  readonly currencyMaskConfig = AppConstants.CURRENCY_MASK_CONFIG;

  constructor(
    activatedRoute: ActivatedRoute,
    sourceService: SourceService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder,
    private incomeSourceService: IncomeSourceService
  ) {
    super(activatedRoute, sourceService, toastService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  protected buildForm(): void {
    const activeDefaultValue =
      this.defaultValues.active == null ? true : this.defaultValues.active;

    this.sourceTypeFormControl = new FormControl(
      this.defaultValues.sourceType,
      [Validators.required]
    );

    this.currencyTypeFormControl = new FormControl(
      this.defaultValues.currencyType,
      [Validators.required]
    );

    this.formGroup = this.formBuilder.group({
      name: [
        this.defaultValues.name,
        [
          Validators.required,
          Validators.minLength(AppConstants.LENGTH_3),
          Validators.maxLength(AppConstants.LENGTH_50),
        ],
      ],
      active: [activeDefaultValue, [Validators.required]],
      incomeSourceId: [
        this.defaultValues.incomeSourceId,
        [Validators.required],
      ],
      sourceType: this.sourceTypeFormControl,
      currencyType: this.currencyTypeFormControl,
      balance: [this.defaultValues.balance, [Validators.required]],
    });
  }

  protected override afterInit(): void {
    this.getIncomeSources(this.defaultValues.incomeSourceName);
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
