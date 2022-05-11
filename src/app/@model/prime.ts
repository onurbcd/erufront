import { Audit } from '@model';

export abstract class Prime<ID> extends Audit {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    public id: ID,
    public name: string,
    public active: boolean
  ) {
    super(createdDate, lastModifiedDate);
  }
}
