import { BalanceType, Filter } from '@model';

export class BalanceFilter extends Filter {
  constructor(
    search: string,
    active: boolean,
    public dayCalendarDate: Date,
    public sourceId: string,
    public categoryId: string,
    public balanceType: BalanceType,
    public dayCalendarYear: number,
    public dayCalendarMonth: number,
    public dayCalendarDayInMonth: number
  ) {
    super(active, search);
  }
}
