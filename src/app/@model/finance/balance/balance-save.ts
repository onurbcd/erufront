import { BalanceType, PrimeSave } from '@model';

export class BalanceSave extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public sequence: number,
    public dayCalendarDate: Date,
    public sourceId: string,
    public categoryId: string,
    public amount: number,
    public code: string,
    public description: string,
    public balanceType: BalanceType,
    public documentsIds: string[]
  ) {
    super(name, active);
  }
}
