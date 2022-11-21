import { CurrencyType, Filter, SourceType } from '@model';

export class SourceFilter extends Filter {
  constructor(
    search: string,
    active: boolean,
    public incomeSourceId: string,
    public sourceType: SourceType,
    public currencyType: CurrencyType
  ) {
    super(active, search);
  }
}
