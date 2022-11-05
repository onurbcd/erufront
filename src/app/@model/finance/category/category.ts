import { Prime } from '@model';

export class Category extends Prime<string> {
  constructor(
    createdDate: Date,
    lastModifiedDate: Date,
    id: string,
    name: string,
    active: boolean,
    public parentId: string,
    public parentName: string,
    public level: number,
    public lastBranch: boolean,
    public description: string
  ) {
    super(createdDate, lastModifiedDate, id, name, active);
  }
}
