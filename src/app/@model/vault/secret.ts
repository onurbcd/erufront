import { Prime } from '@model';

export class Secret extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean,
    public description: string,
    public link: string,
    public username: string,
    public password: string
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
