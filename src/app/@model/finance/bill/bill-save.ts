import { DocumentType, PaymentType, PrimeSave, ReferenceType } from '@model';

export class BillSave extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public referenceDayCalendarDate: Date,
    public documentDateCalendarDate: Date,
    public dueDateCalendarDate: Date,
    public value: number,
    public paymentDateCalendarDate: Date,
    public billDocumentId: string,
    public receiptId: string,
    public observation: string,
    public installment: number,
    public billTypeId: string,
    public documentType: DocumentType,
    public paymentType: PaymentType,
    public budgetId: string,
    public sourceId: string,
    public referenceType: ReferenceType,
    public closed: boolean,
    public balanceId: string
  ) {
    super(name, active);
  }
}
