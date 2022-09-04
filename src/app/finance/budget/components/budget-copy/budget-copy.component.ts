import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CopyBudget, Ref } from '@model';
import { DateService } from '@service';

@Component({
  selector: 'app-budget-copy',
  templateUrl: './budget-copy.component.html',
  styleUrls: ['./budget-copy.component.css'],
})
export class BudgetCopyComponent implements OnInit {
  yearsFrom: number[] = [];

  yearsTo: number[] = [];

  months: number[] = [];

  formGroup!: FormGroup;

  fromRefYearFormControl = new FormControl(this.ref.year, [
    Validators.required,
  ]);

  fromRefMonthFormControl = new FormControl(this.ref.month, [
    Validators.required,
  ]);

  toRefYearFormControl = new FormControl(
    this.dateService.getNextYear(this.ref.year, this.ref.month),
    [Validators.required]
  );

  toRefMonthFormControl = new FormControl(
    this.dateService.getNextMonth(this.ref.month),
    [Validators.required]
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public ref: Ref,
    private matDialogRef: MatDialogRef<BudgetCopyComponent>,
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.yearsFrom = this.dateService.getYears();
    this.yearsTo = this.dateService.getYearsToCopy();
    this.months = this.dateService.getMonths();
  }

  onConfirmClick(): void {
    const copyBudget = new CopyBudget(
      new Ref(
        this.formGroup.value.fromRefYear,
        this.formGroup.value.fromRefMonth
      ),
      new Ref(this.formGroup.value.toRefYear, this.formGroup.value.toRefMonth)
    );

    this.matDialogRef.close(copyBudget);
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      fromRefYear: this.fromRefYearFormControl,
      fromRefMonth: this.fromRefMonthFormControl,
      toRefYear: this.toRefYearFormControl,
      toRefMonth: this.toRefMonthFormControl,
    });
  }
}
