import { PrimeSave } from '@model';

export class BudgetSave extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public sequence: number,
    public refYear: number,
    public refMonth: number,
    public billTypeId: string,
    public billTypeName: string,
    public amount: number,
    public paid: boolean
  ) {
    super(name, active);
  }
}
