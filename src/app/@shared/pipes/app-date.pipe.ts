import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appDate' })
export class AppDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any, format: string = 'yyyy-MM-dd HH:mm:ss'): any {
    const newValue = value ? value + 'Z' : null;
    return super.transform(newValue, format);
  }
}
