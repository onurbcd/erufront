import { PaymentType, PrimeSave } from '@model';

export class BillClose extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public paymentDateCalendarDate: Date,
    public observation: string,
    public paymentType: PaymentType,
    public sourceId: string
  ) {
    super(name, active);
  }
}
