import { Filter } from '@model';

export class BudgetFilter extends Filter {
  constructor(
    search: string,
    active: boolean,
    public refYear: number,
    public refMonth: number,
    public billTypeId: string,
    public paid: boolean
  ) {
    super(active, search);
  }
}
