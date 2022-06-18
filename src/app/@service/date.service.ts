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
    const years = [];
    const currentYear = this.getCurrentYear();

    for (let year = AppConstants.MIN_YEAR; year <= currentYear; year++) {
      years.push(year);
    }

    return years;
  }

  getMonths(): number[] {
    return Array.from({ length: 12 }, (item, index) => index + 1);
  }
}
