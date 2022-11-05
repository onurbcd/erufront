import { PrimeSave } from '@model';

export class BillTypeSave extends PrimeSave {
  constructor(name: string, active: boolean) {
    super(name, active);
  }
}
