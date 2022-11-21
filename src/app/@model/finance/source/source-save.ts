import { CurrencyType, PrimeSave, SourceType } from '@model';

export class SourceSave extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public incomeSourceId: string,
    public sourceType: SourceType,
    public currencyType: CurrencyType,
    public balance: number
  ) {
    super(name, active);
  }
}
