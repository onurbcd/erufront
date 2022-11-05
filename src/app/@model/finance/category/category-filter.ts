import { Filter } from '@model';

export class CategoryFilter extends Filter {
  constructor(
    search: string,
    active: boolean,
    public parentId: string,
    public level: number,
    public lastBranch: boolean
  ) {
    super(active, search);
  }
}
