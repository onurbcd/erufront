import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Budget, BudgetFilter } from '@model';
import { BudgetService, DateService, ToastService } from '@service';
import { BaseFormDirective } from '@shared/directives/base-form.directive';
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

  constructor(
    activatedRoute: ActivatedRoute,
    budgetService: BudgetService,
    toastService: ToastService,
    router: Router,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {
    super(activatedRoute, budgetService, toastService, router);
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
      sequence: [
        { value: sequenceDefaultValue, disabled: true },
        [Validators.required],
      ],
      refYear: this.refYearFormControl,
      refMonth: this.refMonthFormControl,
      // billType: [this.defaultValues.billType, [Validators.required]],
      amount: [this.defaultValues.amount, [Validators.required]],
      paid: [paidDefaultValue, [Validators.required]],
    });
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.years = this.dateService.getYears();
    this.months = this.dateService.getMonths();
  }
}
