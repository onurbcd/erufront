import { CurrencyType, Prime, SourceType } from '@model';

export class Source extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean,
    public incomeSourceId: string,
    public incomeSourceName: string,
    public sourceType: SourceType,
    public currencyType: CurrencyType,
    public balance: number
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
