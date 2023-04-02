import { BalanceType, Prime } from '@model';

export class Balance extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean,
    public sequence: number,
    public dayId: number,
    public dayCalendarDate: Date,
    public sourceId: string,
    public sourceName: string,
    public categoryId: string,
    public categoryName: string,
    public amount: number,
    public code: string,
    public description: string,
    public balanceType: BalanceType,
    public documentsIds: string[]
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
