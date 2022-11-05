import { PrimeSave } from '@model';

export class CategorySave extends PrimeSave {
  constructor(
    name: string,
    active: boolean,
    public parentId: string,
    public parentName: string,
    public level: number,
    public lastBranch: boolean,
    public description: string
  ) {
    super(name, active);
  }
}
