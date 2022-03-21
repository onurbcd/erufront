import { Pageable, Sort } from '@model';

export class Page<T> {
  constructor(
    public content: T[],
    public pageable: Pageable,
    public totalPages: number,
    public totalElements: number,
    public last: boolean,
    public size: number,
    public number: number,
    public sort: Sort,
    public numberOfElements: number,
    public first: boolean,
    public empty: boolean,
    public skipToken: string
  ) {}
}
