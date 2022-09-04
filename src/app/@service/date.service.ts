import { Injectable } from '@angular/core';
import { AppConstants } from '../app-constants';

@Injectable({ providedIn: 'root' })
export class DateService {
  constructor() {}

  getCurrentYear(): number {
    return new Date().getFullYear();
  }

  getCurrentMonth(): number {
    return new Date().getMonth() + 1;
  }

  getYears(): number[] {
    const maxYear = this.getCurrentYear();
    return this.getYearsBase(maxYear);
  }

  getYearsToCopy(): number[] {
    const maxYear = this.getCurrentYear() + 1;
    return this.getYearsBase(maxYear);
  }

  getMonths(): number[] {
    return Array.from({ length: 12 }, (item, index) => index + 1);
  }

  getNextYear(year: number, month: number): number {
    return month === 12 ? year + 1 : year;
  }

  getNextMonth(month: number): number {
    return month === 12 ? 1 : month + 1;
  }

  private getYearsBase(maxYear: number): number[] {
    const years = [];

    for (let year = AppConstants.MIN_YEAR; year <= maxYear; year++) {
      years.push(year);
    }

    return years;
  }
}
