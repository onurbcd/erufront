import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { BillFilter } from '@model';
import { DateService } from '@service';
import { BaseFilterDirective } from '@shared';

@Component({
  selector: 'app-bill-filter',
  templateUrl: './bill-filter.component.html',
  styleUrl: './bill-filter.component.css',
})
export class BillFilterComponent
  extends BaseFilterDirective<BillFilter>
  implements OnInit
{
  years: number[] = [];

  months: number[] = [];

  referenceDayYearFormControl = new FormControl(
    this.dateService.getCurrentYear(),
    [Validators.required]
  );

  referenceDayMonthFormControl = new FormControl(
    this.dateService.getCurrentMonth(),
    [Validators.required]
  );

  @Output() filterChange: EventEmitter<BillFilter> =
    new EventEmitter<BillFilter>();

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
      referenceDayYear: this.referenceDayYearFormControl,
      referenceDayMonth: this.referenceDayMonthFormControl,
    });
  }

  dateSelectionChange(): void {
    this.filterValueChange();
  }

  filterSearchWithEvent(event: MatOptionSelectionChange<string>): void {
    if (!event.isUserInput) {
      return;
    }

    this.filterValueChange();
  }

  filterValueChange(): void {
    this.filterSearch();

    setTimeout(() => {
      this.filterChange.next(this.formGroup.value);
    }, 0);
  }
}
