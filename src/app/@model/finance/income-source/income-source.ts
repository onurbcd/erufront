import { Prime } from '@model';

export class IncomeSource extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
