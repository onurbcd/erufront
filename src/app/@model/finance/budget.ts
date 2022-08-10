import { Prime } from '@model';

export class Budget extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
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
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
