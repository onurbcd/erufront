import { Filter } from '@model';

export class BillTypeFilter extends Filter {
  constructor(search: string, active: boolean) {
    super(active, search);
  }
}
