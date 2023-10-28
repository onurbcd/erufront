import { Prime } from '@model';

export class BillType extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean,
    public path: string,
    public categoryId: string,
    public categoryName: string
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
