import { Filter } from '@model';

export class IncomeSourceFilter extends Filter {
  constructor(search: string, active: boolean) {
    super(active, search);
  }
}
