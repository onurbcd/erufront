import { PrimeSave } from '@model';

export class IncomeSourceSave extends PrimeSave {
  constructor(name: string, active: boolean) {
    super(name, active);
  }
}
