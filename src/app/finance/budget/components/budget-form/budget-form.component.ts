import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillType, BillTypeFilter, Budget, BudgetFilter, Page } from '@model';
import {
  BillTypeService,
  BudgetService,
  DateService,
  ToastService,
} from '@service';
import { BaseFormDirective, Debounce } from '@shared';
import { Observable } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css'],
})
export class BudgetFormComponent
  extends BaseFormDirective<Budget, BudgetFilter, string>
  implements OnInit
{
  years: number[] = [];

  months: number[] = [];

  refYearFormControl = new FormControl();

  refMonthFormControl = new FormControl();

  readonly currencyMaskConfig = AppConstants.CURRENCY_MASK_CONFIG;

  billTypes$!: Observable<Page<BillType>>;

  constructor(
    activatedRoute: ActivatedRoute,
    budgetService: BudgetService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private billTypeService: BillTypeService
  ) {
    super(activatedRoute, budgetService, toastService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.years = this.dateService.getYears();
    this.months = this.dateService.getMonths();
  }

  protected buildForm(): void {
    const activeDefaultValue =
      this.defaultValues.active == null ? true : this.defaultValues.active;

    const sequenceDefaultValue =
      this.defaultValues.sequence == null ? -1 : this.defaultValues.sequence;

    const refYearDefaultValue =
      this.defaultValues.refYear == null
        ? this.dateService.getCurrentYear()
        : this.defaultValues.refYear;

    const refMonthDefaultValue =
      this.defaultValues.refMonth == null
        ? this.dateService.getCurrentMonth()
        : this.defaultValues.refMonth;

    const paidDefaultValue =
      this.defaultValues.paid == null ? false : this.defaultValues.paid;

    this.refYearFormControl = new FormControl(refYearDefaultValue, [
      Validators.required,
    ]);

    this.refMonthFormControl = new FormControl(refMonthDefaultValue, [
      Validators.required,
    ]);

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
      sequence: [sequenceDefaultValue, [Validators.required]],
      refYear: this.refYearFormControl,
      refMonth: this.refMonthFormControl,
      billTypeId: [this.defaultValues.billTypeId, [Validators.required]],
      amount: [this.defaultValues.amount, [Validators.required]],
      paid: [paidDefaultValue, [Validators.required]],
    });
  }

  protected override afterInit(): void {
    this.getBillTypes(this.defaultValues.billTypeName);
  }

  @Debounce(1000)
  searchBillType(searchBillTypeInput: string): void {
    if (!searchBillTypeInput || searchBillTypeInput.trim().length < 3) {
      return;
    }

    this.getBillTypes(searchBillTypeInput);
  }

  private getBillTypes(search: string): void {
    this.billTypes$ = this.billTypeService.getAll(
      { search } as BillTypeFilter,
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
