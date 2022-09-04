import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BudgetFilter, CopyBudget, Ref } from '@model';
import { DateService } from '@service';
import { BaseFilterDirective } from '@shared';
import { BudgetCopyComponent } from '../budget-copy';
import { takeUntil } from 'rxjs';

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

  @Output() dateChange: EventEmitter<BudgetFilter> =
    new EventEmitter<BudgetFilter>();

  @Output() copyBudget: EventEmitter<CopyBudget> =
    new EventEmitter<CopyBudget>();

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private matDialog: MatDialog
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

  dateSelectionChange(): void {
    this.filterSearch();
    this.dateChange.next(this.formGroup.value);
  }

  copy(): void {
    const dialogRef = this.matDialog.open(BudgetCopyComponent, {
      data: new Ref(
        this.formGroup.value.refYear,
        this.formGroup.value.refMonth
      ),
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((copyBudget: CopyBudget) => {
        if (copyBudget) {
          this.copyBudget.next(copyBudget);
        }
      });
  }
}
