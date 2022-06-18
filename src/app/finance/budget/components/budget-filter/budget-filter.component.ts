import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BudgetFilter } from '@model';
import { DateService } from '@service';
import { BaseFilterDirective } from '@shared';

@Component({
  selector: 'app-budget-filter',
  templateUrl: './budget-filter.component.html',
  styleUrls: ['./budget-filter.component.css'],
})
export class BudgetFilterComponent
  extends BaseFilterDirective<BudgetFilter>
  implements OnInit
{
  years: number[] = [];

  months: number[] = [];

  refYearFormControl = new FormControl(this.dateService.getCurrentYear());

  refMonthFormControl = new FormControl(this.dateService.getCurrentMonth());

  paidFormControl = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.years = this.dateService.getYears();
    this.months = this.dateService.getMonths();
  }

  protected buildForm(): void {
    this.formGroup = this.formBuilder.group({
      search: this.searchFormControl,
      active: this.activeFormControl,
      refYear: this.refYearFormControl,
      refMonth: this.refMonthFormControl,
      paid: this.paidFormControl,
    });
  }

  protected resetForm(path: string): void {
    this.formGroup.get(path)?.reset();
  }
}
