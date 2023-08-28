import { PrimeSave } from '@model';

export class BillTypeSave extends PrimeSave {
  constructor(name: string, active: boolean, public path: string) {
    super(name, active);
  }
}
