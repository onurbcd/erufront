import { DocumentType, PrimeSave, ReferenceType } from '@model';

export class BillOpen extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public referenceDayCalendarDate: Date,
    public documentDateCalendarDate: Date,
    public dueDateCalendarDate: Date,
    public observation: string,
    public installment: number,
    public documentType: DocumentType,
    public budgetId: string,
    public referenceType: ReferenceType
  ) {
    super(name, active);
  }
}
