import {
  Document,
  DocumentType,
  PaymentType,
  Prime,
  ReferenceType,
} from '@model';

export class Bill extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean,
    public referenceDayId: number,
    public referenceDayCalendarDate: Date,
    public documentDateId: number,
    public documentDateCalendarDate: Date,
    public dueDateId: number,
    public dueDateCalendarDate: Date,
    public value: number,
    public paymentDateId: number,
    public paymentDateCalendarDate: Date,
    public billDocument: Document,
    public receipt: Document,
    public observation: string,
    public installment: number,
    public billTypeId: string,
    public billTypeName: string,
    public documentType: DocumentType,
    public paymentType: PaymentType,
    public budgetId: string,
    public budgetName: string,
    public sourceId: string,
    public sourceName: string,
    public referenceType: ReferenceType,
    public closed: boolean,
    public balanceId: string,
    public balanceName: string
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
