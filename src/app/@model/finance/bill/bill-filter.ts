import { DocumentType, Filter, PaymentType, ReferenceType } from '@model';

export class BillFilter extends Filter {
  constructor(
    search: string,
    active: boolean,
    public referenceDayYear: number,
    public referenceDayMonth: number,
    public documentDateCalendarDate: Date,
    public dueDateCalendarDate: Date,
    public paymentDateCalendarDate: Date,
    public billTypeId: string,
    public documentType: DocumentType,
    public paymentType: PaymentType,
    public sourceId: string,
    public referenceType: ReferenceType,
    public closed: boolean
  ) {
    super(active, search);
  }
}
