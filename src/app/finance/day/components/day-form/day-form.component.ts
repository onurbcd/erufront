import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import {
  MatCalendarCellClassFunction,
  MatDatepicker,
} from '@angular/material/datepicker';
import { Day } from '@model';
import { DayService, ToastService } from '@service';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-day-form',
  templateUrl: './day-form.component.html',
  styleUrls: ['./day-form.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: AppConstants.APP_DAY_FORMAT },
  ],
})
export class DayFormComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  date = new FormControl({ value: moment.utc(), disabled: true });

  max = moment.utc();

  min = moment.utc({ year: AppConstants.MIN_YEAR, month: 0, day: 1 });

  months: Day[] = [];

  dateClass: MatCalendarCellClassFunction<moment.Moment> = (date, view) => {
    if (!view || view !== 'year' || !date) {
      return '';
    }

    const month = this.months.find(
      (v) =>
        v.calendarYear === date.year() && v.calendarMonth === date.month() + 1
    );

    return month ? 'month-selected' : '';
  };

  constructor(
    private dayService: DayService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.dayService
      .getYearsAndMonths()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((months) => {
        this.months = months;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onMonthSelected(
    date: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ): void {
    const value = this.date.value;
    value?.year(date.year());
    value?.month(date.month());
    this.date.setValue(value);
    datepicker.close();
  }

  saveButtonDisabled(): boolean {
    return (
      this.months.find(
        (v) =>
          v.calendarYear === this.date.value?.year() &&
          v.calendarMonth === this.date.value.month() + 1
      ) != null
    );
  }

  save(): void {
    const year = this.date.value?.year();
    const month = this.date.value?.month();

    if (year == null || month == null) {
      return;
    }

    const day = new Day(year, month + 1);

    this.dayService
      .createMonth(day)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.months.push(day);
        this.toastService.showSuccess('global.saveSuccess');
      });
  }
}
