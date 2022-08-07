import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appDate' })
export class AppDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    const newValue = value ? value + 'Z' : null;
    return super.transform(newValue, 'yyyy-MM-dd HH:mm:ss');
  }
}
