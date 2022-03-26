import { Identifier } from '@model';

export class Secret extends Identifier<string> {
  constructor(
    id: string,
    public name: string,
    public description: string,
    public link: string,
    public username: string,
    public password: string,
    public createdDate: Date,
    public lastModifiedDate: Date
  ) {
    super(id);
  }
}
