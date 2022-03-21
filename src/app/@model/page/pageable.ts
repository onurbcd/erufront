import { Sort } from '@model';

export class Pageable {
  constructor(
    public sort: Sort,
    public pageNumber: number,
    public pageSize: number,
    public offset: number,
    public paged: boolean,
    public unpaged: boolean
  ) {}
}
